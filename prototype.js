/* ============================================================
   prototype.js — Multi-Car Visit System
   يعمل مع api.js الحقيقي (apiGetServices / apiAddVisit ...)
============================================================ */

let carCounter = 0;
const carsState = new Map(); // { cardId: { services:[], total:0 } }
let ALL_SERVICES = [];       // نخزن كل الخدمات هنا بعد تحميلها مرة واحدة

/* ============================================================
   تحميل البيانات الأساسية مرة واحدة عند فتح الصفحة
============================================================ */
document.addEventListener("DOMContentLoaded", async () => {

    // تحميل كل الخدمات مرة واحدة
    const servicesRes = await apiGetServices();
    ALL_SERVICES = servicesRes.data || [];

    // إضافة أول سيارة
    addCarCard();

    // زر إضافة سيارة
    document.getElementById("btnAddCar").addEventListener("click", addCarCard);

    // زر تسجيل كل الزيارات المكتملة
    document.getElementById("btnSubmitAll").addEventListener("click", submitAllVisits);
});

/* ============================================================
   إضافة كارد سيارة جديدة
============================================================ */
function addCarCard() {
    const template = document.getElementById("carCardTemplate");
    const container = document.getElementById("carsContainer");

    carCounter++;
    const cardId = `car_${carCounter}`;

    const clone = template.content.cloneNode(true);
    const cardEl = clone.querySelector(".car-card");
    cardEl.dataset.cardId = cardId;

    // حفظ حالة الكارد
    carsState.set(cardId, {
        services: [],
        total: 0
    });

    // ربط عناصر الكارد
    wireCard(cardEl, cardId);

    container.appendChild(cardEl);
}

/* ============================================================
   ربط عناصر الكارد بالأحداث
============================================================ */
function wireCard(cardEl, cardId) {

    const car_type      = cardEl.querySelector(".car_type");
    const car_model     = cardEl.querySelector(".car_model");
    const service_type  = cardEl.querySelector(".service_type");
    const service_detail= cardEl.querySelector(".service_detail");
    const employee_in   = cardEl.querySelector(".employee_in");
    const parking_slot  = cardEl.querySelector(".parking_slot");

    const btnAddService = cardEl.querySelector(".btnAddService");
    const discountInput = cardEl.querySelector(".discount");
    const tipInput      = cardEl.querySelector(".tip");
    const payment_status= cardEl.querySelector(".payment_status");
    const payment_method= cardEl.querySelector(".payment_method");

    const removeBtn     = cardEl.querySelector(".remove-card");

    /* تحميل البيانات */
    loadCarTypes(car_type, car_model);
    loadEmployees(employee_in);
    loadParkingSlots(parking_slot);
    loadServiceTypes(service_type);

    /* عند تغيير نوع الخدمة → نفلتر الخدمات */
    service_type.addEventListener("change", () => {
        loadServiceDetails(service_type, service_detail);
    });

    /* عند تغيير تفاصيل الخدمة → تحديث السعر المؤقت */
    service_detail.addEventListener("change", () => {
        const opt = service_detail.selectedOptions[0];
        if (!opt) return;
        cardEl.querySelector(".price").value = opt.dataset.price || "";
    });

    /* زر إضافة خدمة */
    btnAddService.addEventListener("click", () => addServiceToCard(cardId, cardEl));

    /* إعادة حساب الإجمالي عند تغيير الخصم/الإكرامية/الدفع */
    discountInput.addEventListener("input", () => recalcCardTotal(cardId, cardEl));
    tipInput.addEventListener("input", () => recalcCardTotal(cardId, cardEl));
    payment_status.addEventListener("change", () => recalcCardTotal(cardId, cardEl));
    payment_method.addEventListener("change", () => recalcCardTotal(cardId, cardEl));

    /* حذف الكارد */
    removeBtn.addEventListener("click", () => {
        carsState.delete(cardId);
        cardEl.remove();
    });
}

/* ============================================================
   تحميل أنواع السيارات
============================================================ */
async function loadCarTypes(selectEl, modelSelect) {
    const res = await apiGetCarTypes();
    const types = res.data || [];

    selectEl.innerHTML = `<option value="">اختر البراند</option>`;
    types.forEach(t => {
        selectEl.innerHTML += `<option value="${t.id}">${t.name}</option>`;
    });

    selectEl.addEventListener("change", async () => {
        const models = types.find(x => x.id == selectEl.value)?.models || [];
        modelSelect.innerHTML = `<option value="">اختر الموديل</option>`;
        models.forEach(m => {
            modelSelect.innerHTML += `<option value="${m.id}">${m.name}</option>`;
        });
    });
}

/* ============================================================
   تحميل الموظفين
============================================================ */
async function loadEmployees(selectEl) {
    const res = await apiGetEmployees();
    const emps = res.data || [];

    selectEl.innerHTML = `<option value="">اختر الموظف</option>`;
    emps.forEach(e => {
        selectEl.innerHTML += `<option value="${e.id}">${e.name}</option>`;
    });
}

/* ============================================================
   تحميل المواقف
============================================================ */
function loadParkingSlots(selectEl) {
    selectEl.innerHTML = `<option value="">اختر الموقف</option>`;
    [1,2,3,4,5,6].forEach(s => {
        selectEl.innerHTML += `<option value="${s}">${s}</option>`;
    });
}

/* ============================================================
   تحميل أنواع الخدمات
============================================================ */
function loadServiceTypes(selectEl) {
    const categories = [...new Set(ALL_SERVICES.map(s => s.category))];

    selectEl.innerHTML = `<option value="">اختر النوع</option>`;
    categories.forEach(c => {
        selectEl.innerHTML += `<option value="${c}">${c}</option>`;
    });
}

/* ============================================================
   تحميل تفاصيل الخدمات حسب النوع
============================================================ */
function loadServiceDetails(typeSelect, detailSelect) {
    const category = typeSelect.value;

    detailSelect.innerHTML = `<option value="">اختر الخدمة</option>`;

    ALL_SERVICES
        .filter(s => s.category === category)
        .forEach(s => {
            detailSelect.innerHTML += `
                <option value="${s.id}" data-price="${s.price}" data-points="${s.points}">
                    ${s.name} — ${s.price} ريال
                </option>`;
        });
}

/* ============================================================
   إضافة خدمة داخل الكارد
============================================================ */
function addServiceToCard(cardId, cardEl) {
    const state = carsState.get(cardId);
    const service_detail = cardEl.querySelector(".service_detail");
    const servicesList = cardEl.querySelector(".servicesList");

    const opt = service_detail.selectedOptions[0];
    if (!opt || !opt.value) {
        showToast("اختر خدمة أولاً", "error");
        return;
    }

    const service = {
        id: opt.value,
        name: opt.textContent,
        price: Number(opt.dataset.price),
        points: Number(opt.dataset.points)
    };

    state.services.push(service);

    renderServices(cardId, cardEl);
    recalcCardTotal(cardId, cardEl);
}

/* ============================================================
   عرض قائمة الخدمات داخل الكارد
============================================================ */
function renderServices(cardId, cardEl) {
    const state = carsState.get(cardId);
    const box = cardEl.querySelector(".servicesList");

    if (state.services.length === 0) {
        box.innerHTML = "لا توجد خدمات مضافة بعد";
        return;
    }

    box.innerHTML = "";

    state.services.forEach((s, i) => {
        const row = document.createElement("div");
        row.style.display = "flex";
        row.style.justifyContent = "space-between";
        row.style.marginBottom = "5px";

        row.innerHTML = `
            <span>${s.name} — ${s.price} ريال</span>
            <button style="background:#ff4d4d;color:#fff;border:none;padding:3px 8px;border-radius:4px;cursor:pointer;">
                حذف
            </button>
        `;

        row.querySelector("button").addEventListener("click", () => {
            state.services.splice(i, 1);
            renderServices(cardId, cardEl);
            recalcCardTotal(cardId, cardEl);
        });

        box.appendChild(row);
    });
}

/* ============================================================
   حساب الإجمالي داخل الكارد
============================================================ */
function recalcCardTotal(cardId, cardEl) {
    const state = carsState.get(cardId);

    const discount = Number(cardEl.querySelector(".discount").value || 0);
    const tip      = Number(cardEl.querySelector(".tip").value || 0);

    let total = 0;
    state.services.forEach(s => total += s.price);

    const final = Math.max(total - discount + tip, 0);

    cardEl.querySelector(".totalPrice").textContent = final;
    cardEl.querySelector(".price").value = final;
}

/* ============================================================
   التحقق من اكتمال الكارد
============================================================ */
function isCardComplete(cardEl) {
    const required = [
        ".plate_numbers",
        ".plate_letters",
        ".car_type",
        ".car_model",
        ".service_type",
        ".employee_in",
        ".parking_slot",
        ".payment_status"
    ];

    for (const sel of required) {
        if (!cardEl.querySelector(sel).value) return false;
    }

    const price = Number(cardEl.querySelector(".price").value || 0);
    if (price <= 0) return false;

    return true;
}

/* ============================================================
   بناء Payload للـ API
============================================================ */
function buildPayload(cardEl, cardId) {
    const state = carsState.get(cardId);

    return {
        action: "addVisit",
        plate_numbers: cardEl.querySelector(".plate_numbers").value,
        plate_letters: cardEl.querySelector(".plate_letters").value,
        car_type: cardEl.querySelector(".car_type").value,
        car_model: cardEl.querySelector(".car_model").value,
        employee: cardEl.querySelector(".employee_in").value,
        parking_slot: cardEl.querySelector(".parking_slot").value,

        payment_status: cardEl.querySelector(".payment_status").value,
        payment_method: cardEl.querySelector(".payment_method").value || "غير مدفوع",

        discount: Number(cardEl.querySelector(".discount").value || 0),
        tip: Number(cardEl.querySelector(".tip").value || 0),
        total: Number(cardEl.querySelector(".price").value || 0),

        services: JSON.stringify(state.services)
    };
}

/* ============================================================
   تسجيل كل الزيارات المكتملة فقط
============================================================ */
async function submitAllVisits() {
    const cards = document.querySelectorAll(".car-card");
    let submitted = 0;

    for (const cardEl of cards) {
        const cardId = cardEl.dataset.cardId;

        if (!isCardComplete(cardEl)) continue;

        const payload = buildPayload(cardEl, cardId);

        const res = await apiAddVisit(payload);

        if (res && res.status === "success") {
            submitted++;
            cardEl.remove();
            carsState.delete(cardId);
        }
    }

    if (submitted === 0) {
        showToast("لا توجد سيارات مكتملة للتسجيل", "error");
    } else {
        showToast(`تم تسجيل ${submitted} زيارة بنجاح`, "info");
    }
}

/* ============================================================
   Toast
============================================================ */
function showToast(msg, type="info") {
    alert(msg);
}
