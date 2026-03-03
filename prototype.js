// التبويبات
document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
        document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
        btn.classList.add("active");
        document.getElementById(btn.dataset.tab).classList.add("active");
    };
});

// نموذج زيارة كامل (جاهز للحقن)
function createVisitForm() {
    return `
    <div class="card">
        <h3>سيارة جديدة</h3>

        <label>أرقام اللوحة *</label>
        <input placeholder="1234">

        <label>حروف اللوحة *</label>
        <input placeholder="ABC">

        <label>براند السيارة *</label>
        <select>
            <option>تويوتا</option>
            <option>هيونداي</option>
            <option>كيا</option>
        </select>

        <label>موديل السيارة *</label>
        <select>
            <option>كامري</option>
            <option>كورولا</option>
            <option>سوناتا</option>
        </select>

        <label>الحجم</label>
        <input value="سيدان" readonly>

        <label>نوع الخدمة *</label>
        <select>
            <option>خارجي</option>
            <option>داخلي</option>
        </select>

        <label>تفاصيل الخدمة *</label>
        <select>
            <option>غسيل عادي</option>
            <option>غسيل فاخر</option>
        </select>

        <label>السعر</label>
        <input value="25" readonly>

        <label>النقاط</label>
        <input value="3" readonly>

        <label>الخصم</label>
        <input placeholder="0">

        <label>الإكرامية</label>
        <input placeholder="0">

        <label>رقم الموقف *</label>
        <select>
            <option>1</option>
            <option>2</option>
            <option>3</option>
        </select>

        <label>الموظف *</label>
        <select>
            <option>سلوى</option>
            <option>أحمد</option>
        </select>

        <label>الفرع *</label>
        <select>
            <option>مكة</option>
            <option>الرياض</option>
        </select>

        <label>حالة الدفع *</label>
        <select>
            <option>مدفوع</option>
            <option>غير مدفوع</option>
        </select>

        <label>طريقة الدفع *</label>
        <select>
            <option>كاش</option>
            <option>شبكة</option>
            <option>جزئي</option>
        </select>

        <button class="btn-primary full">تسجيل</button>
        <button class="btn-danger full remove">حذف</button>
    </div>
    `;
}

// تبويب 1 — نماذج متعددة
document.getElementById("addForm").onclick = () => {
    const box = document.createElement("div");
    box.innerHTML = createVisitForm();
    box.querySelector(".remove").onclick = () => box.remove();
    document.getElementById("formsContainer").appendChild(box);
};

// تبويب 2 — السلة
document.getElementById("basketForm").innerHTML = createVisitForm();

document.getElementById("addToCart")?.addEventListener("click", () => {
    const item = document.createElement("div");
    item.className = "card";
    item.innerHTML = `سيارة مضافة للسلة <button class="btn-danger remove">حذف</button>`;
    item.querySelector(".remove").onclick = () => item.remove();
    document.getElementById("cartList").appendChild(item);
});

// تبويب 3 — نموذج متعدد السيارات
document.getElementById("addMultiCar").onclick = () => {
    const item = document.createElement("div");
    item.innerHTML = createVisitForm();
    item.querySelector(".remove").onclick = () => item.remove();
    document.getElementById("multiCarContainer").appendChild(item);
};

// تبويب 4 — الاستقبال السريع
document.getElementById("fastForm").innerHTML = createVisitForm();

document.getElementById("fastAdd")?.addEventListener("click", () => {
    const item = document.createElement("div");
    item.className = "card";
    item.innerHTML = `سيارة تمت إضافتها <button class="btn-danger remove">حذف</button>`;
    item.querySelector(".remove").onclick = () => item.remove();
    document.getElementById("fastList").appendChild(item);
});

// مودالات
document.querySelectorAll(".modal-close").forEach(btn => {
    btn.onclick = () => {
        btn.closest(".modal-overlay").style.display = "none";
    };
});

// Toast
function showToast(msg) {
    const t = document.createElement("div");
    t.className = "toast";
    t.textContent = msg;
    document.getElementById("toast-container").appendChild(t);
    setTimeout(() => t.classList.add("show"), 50);
    setTimeout(() => t.remove(), 3000);
}
