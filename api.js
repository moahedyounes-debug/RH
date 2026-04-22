/* ===========================
   API URL
=========================== */
const API_URL =
  "https://script.google.com/macros/s/AKfycbwYRi7IFVTQ80wR2_VLrOrRb5ugvzSePw6rX6R6dDGEy-GWwciQIseeH36kknZXs3TfaA/exec";

/* ===========================
   POST Wrapper
=========================== */
async function apiPost(params) {
  const form = new URLSearchParams();
  Object.keys(params).forEach(k => {
    if (params[k] !== undefined && params[k] !== null) {
      form.append(k, params[k]);
    }
  });
  const res = await fetch(API_URL, {
    method: "POST",
    body: form
  });
  return res.json();
}

/* ===========================
   Universal Get
=========================== */
async function apiGetAll(sheet) {
  return apiPost({ action: "getAll", sheet });
}

/* ===========================
   Supervisors Login
=========================== */
async function apiLoginSupervisor(username, password) {
  return apiPost({ action: "loginSupervisor", username, password });
}

/* ===========================
   Customers
=========================== */
async function apiGetCustomerByPhone(phone) {
  return apiPost({ action: "getCustomerByPhone", phone });
}

async function apiGetCustomerByMembership(membership) {
  return apiPost({ action: "getCustomerByMembership", membership });
}

/* ===========================
   Cars
=========================== */
async function apiGetCarsByPhone(phone) {
  return apiPost({ action: "getCarsByPhone", phone });
}

async function apiGetCarByMembership(membership) {
  return apiPost({ action: "getCarByMembership", membership });
}

async function apiAddCar(data) {
  return apiPost({ action: "addCar", ...data });
}

/* ===========================
   Visits
=========================== */
async function apiAddVisit(data) {
  return apiPost({ action: "addVisit", ...data });
}

async function apiCloseVisit(row, data) {
  return apiPost({
    action: "closeVisit",
    row,
    payment_method: data.payment_method,
    cash_amount:    data.cash_amount,
    card_amount:    data.card_amount,
    total_paid:     data.total_paid,
    tip:            data.tip,
    discount:       data.discount
  });
}

async function apiGetVisitsByMembership(membership) {
  return apiPost({ action: "getVisitsByMembership", membership });
}

async function apiGetActiveVisits() {
  return apiPost({ action: "getActiveVisits" });
}

/* ===========================
   Bookings
=========================== */
async function apiGetBookingsByPhone(phone) {
  return apiPost({ action: "getBookingsByPhone", phone });
}

async function apiGetBookingsByDate(date) {
  return apiPost({ action: "getBookingsByDate", date });
}

async function apiAddBooking(data) {
  return apiPost({ action: "addBooking", ...data });
}

async function apiUpdateBookingStatus(row, status) {
  return apiPost({ action: "updateBookingStatus", row, status });
}

async function apiUpdateBookingDate(row, date, time) {
  return apiPost({ action: "updateBookingDate", row, date, time });
}

/* ===========================
   Services / Commissions
=========================== */
async function apiGetServices() {
  return apiPost({ action: "getServices" });
}

async function apiGetServicesByCategory(category) {
  return apiPost({ action: "getServicesByCategory", category });
}

async function apiGetCarTypes() {
  return apiPost({ action: "getCarTypes" });
}

/* ===========================
   Employees
=========================== */
async function apiGetEmployees() {
  return apiPost({ action: "getEmployees" });
}

/* ===========================
   Branches
=========================== */
async function apiGetBranches() {
  return apiPost({ action: "getBranches" });
}

/* ===========================
   Payroll
=========================== */
async function apiCalculatePayrollByEmployee(employee, from, to) {
  return apiPost({ action: "calculatePayrollByEmployee", employee, from, to });
}

async function apiAddPayroll(data) {
  return apiPost({ action: "addPayroll", ...data });
}

/* ===========================
   Notifications
=========================== */
async function apiAddNotification(data) {
  return apiPost({ action: "addNotification", ...data });
}

async function apiGetNotifications(phone) {
  return apiPost({ action: "getNotifications", phone });
}

async function apiMarkNotificationRead(row) {
  return apiPost({ action: "markNotificationRead", row });
}

/* ===========================
   Levels
=========================== */
async function apiGetLevels() {
  return apiPost({ action: "getLevels" });
}

/* ===========================
   Universal Row Operations
=========================== */
async function apiUpdateRow(sheet, row, values) {
  return apiPost({ action: "updateRow", sheet, row, values: JSON.stringify(values) });
}

async function apiDeleteRow(sheet, row) {
  return apiPost({ action: "deleteRow", sheet, row });
}

async function apiAddRow(sheet, values) {
  return apiPost({ action: "addRow", sheet, values: JSON.stringify(values) });
}

/* ===========================
   PassKit
=========================== */
async function apiCreatePassForCustomerByPhone(phone) {
  return apiPost({ action: "createPassForCustomerByPhone", phone });
}

async function apiGetPassLinksByPhone(phone) {
  return apiPost({ action: "getPassLinksByPhone", phone });
}

/* ============================================================
   COLUMN INDEXES
   مطابقة 100% لـ Google Apps Script (HYBRID FOAM MASTER API v4)
   ============================================================

   Customers: name[0] phone[1] car[2] size[3] city[4]
              plate_numbers[5] plate_letters[6] subscription[7]
              membership[8] last_visit[9] visit_count[10]
              points[11] level[12] free_wash[13]

   Visits:    membership[0] plate_numbers[1] plate_letters[2]
              car_type[3] car_model[4] car_size[5]
              service[6] price[7] points[8]
              emp_in[9] emp_out[10] branch[11] commission[12]
              check_in[13] check_out[14] pay_status[15] pay_method[16]
              parking[17] rating[18] pay_method_copy[19]
              cash_amount[20] card_amount[21] total_paid[22]
              tip[23] discount[24]

   Cars:      membership[0] phone[1] car[2] size[3]
              plate_letters[4] plate_numbers[5] city[6] created_at[7]

   Bookings:  phone[0] membership[1] service[2]
              date[3] time[4] status[5] created_at[6]
   ============================================================ */

const CUST_COL = {
  NAME:0, PHONE:1, CAR:2, SIZE:3, CITY:4,
  PLATE_NUMBERS:5, PLATE_LETTERS:6, SUBSCRIPTION:7,
  MEMBERSHIP:8, LAST_VISIT:9, VISIT_COUNT:10,
  POINTS:11, LEVEL:12, FREE_WASH:13
};

const VISIT_COL = {
  MEMBERSHIP:0, PLATE_NUMBERS:1, PLATE_LETTERS:2,
  CAR_TYPE:3, CAR_MODEL:4, CAR_SIZE:5,
  SERVICE:6, PRICE:7, POINTS:8,
  EMP_IN:9, EMP_OUT:10, BRANCH:11, COMMISSION:12,
  CHECK_IN:13, CHECK_OUT:14, PAY_STATUS:15, PAY_METHOD:16,
  PARKING:17, RATING:18, PAY_METHOD_COPY:19,
  CASH_AMOUNT:20, CARD_AMOUNT:21, TOTAL_PAID:22, TIP:23, DISCOUNT:24
};

const CAR_COL = {
  MEMBERSHIP:0, PHONE:1, CAR:2, SIZE:3,
  PLATE_LETTERS:4, PLATE_NUMBERS:5, CITY:6, CREATED_AT:7
};

const BOOK_COL = {
  PHONE:0, MEMBERSHIP:1, SERVICE:2,
  DATE:3, TIME:4, STATUS:5, CREATED_AT:6
};

/* ============================================================
   PARSE HELPERS
   استخدمها في أي صفحة بدل ما تكتب row[0], row[1]...
   ============================================================ */

/** parseCustomer(row) → object واضح */
function parseCustomer(row) {
  if (!row) return null;
  return {
    name:          row[CUST_COL.NAME]          || "",
    phone:         String(row[CUST_COL.PHONE]  || "").replace(/'/g,""),
    car:           row[CUST_COL.CAR]           || "",
    size:          row[CUST_COL.SIZE]          || "",
    city:          row[CUST_COL.CITY]          || "",
    plate_numbers: row[CUST_COL.PLATE_NUMBERS] || "",
    plate_letters: row[CUST_COL.PLATE_LETTERS] || "",
    subscription:  row[CUST_COL.SUBSCRIPTION]  || "بدون اشتراك",
    membership:    String(row[CUST_COL.MEMBERSHIP] || ""),
    last_visit:    row[CUST_COL.LAST_VISIT]    || "—",
    visit_count:   Number(row[CUST_COL.VISIT_COUNT]) || 0,
    points:        Number(row[CUST_COL.POINTS])      || 0,
    level:         row[CUST_COL.LEVEL]         || "Bronze",
    free_wash:     Number(row[CUST_COL.FREE_WASH])   || 0,
  };
}

/** parseVisit(row) → object واضح */
function parseVisit(row) {
  if (!row) return null;
  return {
    membership:    row[VISIT_COL.MEMBERSHIP]    || "",
    plate_numbers: row[VISIT_COL.PLATE_NUMBERS] || "",
    plate_letters: row[VISIT_COL.PLATE_LETTERS] || "",
    car_type:      row[VISIT_COL.CAR_TYPE]      || "",
    car_model:     row[VISIT_COL.CAR_MODEL]     || "",
    car_size:      row[VISIT_COL.CAR_SIZE]      || "",
    service:       row[VISIT_COL.SERVICE]       || "",
    price:         Number(row[VISIT_COL.PRICE])        || 0,
    points:        Number(row[VISIT_COL.POINTS])       || 0,
    emp_in:        row[VISIT_COL.EMP_IN]        || "",
    emp_out:       row[VISIT_COL.EMP_OUT]       || "",
    branch:        row[VISIT_COL.BRANCH]        || "",
    commission:    Number(row[VISIT_COL.COMMISSION])   || 0,
    check_in:      row[VISIT_COL.CHECK_IN]      || "",
    check_out:     row[VISIT_COL.CHECK_OUT]     || "",
    pay_status:    row[VISIT_COL.PAY_STATUS]    || "",
    pay_method:    row[VISIT_COL.PAY_METHOD]    || "",
    parking:       row[VISIT_COL.PARKING]       || "",
    rating:        row[VISIT_COL.RATING]        || "",
    cash_amount:   Number(row[VISIT_COL.CASH_AMOUNT])  || 0,
    card_amount:   Number(row[VISIT_COL.CARD_AMOUNT])  || 0,
    total_paid:    Number(row[VISIT_COL.TOTAL_PAID])   || 0,
    tip:           Number(row[VISIT_COL.TIP])          || 0,
    discount:      Number(row[VISIT_COL.DISCOUNT])     || 0,
  };
}

/** parseCar(row) → object واضح */
function parseCar(row) {
  if (!row) return null;
  return {
    membership:    String(row[CAR_COL.MEMBERSHIP]  || ""),
    phone:         String(row[CAR_COL.PHONE]       || "").replace(/'/g,""),
    car:           row[CAR_COL.CAR]           || "",
    size:          row[CAR_COL.SIZE]          || "",
    plate_letters: row[CAR_COL.PLATE_LETTERS] || "",
    plate_numbers: row[CAR_COL.PLATE_NUMBERS] || "",
    city:          row[CAR_COL.CITY]          || "",
    created_at:    row[CAR_COL.CREATED_AT]    || "",
  };
}

/** parseBooking(row) → object واضح */
function parseBooking(row) {
  if (!row) return null;
  return {
    phone:      String(row[BOOK_COL.PHONE]      || "").replace(/'/g,""),
    membership: String(row[BOOK_COL.MEMBERSHIP] || ""),
    service:    row[BOOK_COL.SERVICE]    || "",
    date:       row[BOOK_COL.DATE]       || "",
    time:       row[BOOK_COL.TIME]       || "",
    status:     row[BOOK_COL.STATUS]     || "",
    created_at: row[BOOK_COL.CREATED_AT] || "",
  };
}

/* ============================================================
   DATE / TIME HELPERS
   ============================================================ */

/**
 * formatDateTime(valueDate, valueTime)
 * يدعم: "yyyy-MM-dd HH:mm" | "yyyy-MM-dd" | نص | Excel serial
 * يرجع: { day, date, time }
 */
function formatDateTime(valueDate, valueTime) {
  let finalDate = "", finalTime = "", finalDay = "";

  if (valueDate) {
    const s = String(valueDate);

    // "yyyy-MM-dd HH:mm" كامل في حقل واحد
    if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}/.test(s)) {
      const [dp, tp] = s.split(" ");
      const d = new Date(dp);
      if (!isNaN(d)) {
        finalDay  = d.toLocaleDateString("ar-SA", { weekday:"long" });
        finalDate = d.toLocaleDateString("ar-SA", { year:"numeric", month:"short", day:"2-digit" });
      }
      if (!valueTime) finalTime = tp ? tp.slice(0,5) : "";
    }
    // "yyyy-MM-dd"
    else if (/^\d{4}-\d{2}-\d{2}$/.test(s)) {
      const d = new Date(s);
      if (!isNaN(d)) {
        finalDay  = d.toLocaleDateString("ar-SA", { weekday:"long" });
        finalDate = d.toLocaleDateString("ar-SA", { year:"numeric", month:"short", day:"2-digit" });
      }
    }
    // نص آخر
    else if (isNaN(valueDate)) {
      const d = new Date(s);
      if (!isNaN(d)) {
        finalDay  = d.toLocaleDateString("ar-SA", { weekday:"long" });
        finalDate = d.toLocaleDateString("ar-SA", { year:"numeric", month:"short", day:"2-digit" });
      }
    }
    // Excel serial number
    else {
      const n = Number(valueDate);
      if (n > 40000 && n < 60000) {
        const d = new Date((n - 25569) * 86400 * 1000);
        if (!isNaN(d)) {
          finalDay  = d.toLocaleDateString("ar-SA", { weekday:"long" });
          finalDate = d.toLocaleDateString("ar-SA", { year:"numeric", month:"short", day:"2-digit" });
        }
      }
    }
  }

  if (valueTime && !finalTime) {
    const vt = String(valueTime);
    if (vt.includes("AM") || vt.includes("PM")) {
      const t = new Date("2000-01-01 " + vt);
      if (!isNaN(t))
        finalTime = String(t.getHours()).padStart(2,"0") + ":" + String(t.getMinutes()).padStart(2,"0");
    } else if (/^\d{1,2}:\d{2}/.test(vt)) {
      finalTime = vt.slice(0,5);
    } else if (!isNaN(valueTime)) {
      const n = Number(valueTime);
      if (n > 0 && n < 1) {
        const mins = Math.round(n * 24 * 60);
        finalTime = String(Math.floor(mins/60)).padStart(2,"0") + ":" + String(mins%60).padStart(2,"0");
      }
    }
  }

  return { day: finalDay, date: finalDate, time: finalTime };
}

/**
 * formatCheckIn(checkIn)
 * مخصص لعمود check_in اللي يجي "yyyy-MM-dd HH:mm"
 */
function formatCheckIn(checkIn) {
  if (!checkIn) return { day:"", date:"—", time:"—" };
  return formatDateTime(String(checkIn), null);
}
