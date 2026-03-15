/* ===========================
   API URL
=========================== */

const API_URL =
  "https://script.google.com/macros/s/AKfycbw77Oyly98-aCfSHXuNQawhRHkzWKntolBW2TR_IO0n1kB8SNeqXKmeZ8FHKFdZzAyc7g/exec";

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
  return apiPost({
    action: "loginSupervisor",
    username,
    password
  });
}

/* ===========================
   Customers
=========================== */

async function apiGetCustomerByPhone(phone) {
  return apiPost({
    action: "getCustomerByPhone",
    phone
  });
}

async function apiGetCustomerByMembership(membership) {
  return apiPost({
    action: "getCustomerByMembership",
    membership
  });
}

/* ===========================
   Cars
=========================== */

async function apiGetCarsByPhone(phone) {
  return apiPost({
    action: "getCarsByPhone",
    phone
  });
}

async function apiGetCarByMembership(membership) {
  return apiPost({
    action: "getCarByMembership",
    membership
  });
}

async function apiAddCar(data) {
  return apiPost({
    action: "addCar",
    ...data
  });
}

/* ===========================
   Visits
=========================== */

async function apiAddVisit(data) {
  return apiPost({
    action: "addVisit",
    ...data
  });
}

async function apiCloseVisit(row, data) {
  return apiPost({
    action: "closeVisit",
    row,

    payment_method: data.payment_method,

    cash_amount: data.cash_amount,
    card_amount: data.card_amount,
    total_paid: data.total_paid,

    tip: data.tip,
    discount: data.discount
  });
}

async function apiGetVisitsByMembership(membership) {
  return apiPost({
    action: "getVisitsByMembership",
    membership
  });
}

async function apiGetActiveVisits() {
  return apiPost({
    action: "getActiveVisits"
  });
}

/* ===========================
   Bookings
=========================== */

async function apiGetBookingsByPhone(phone) {
  return apiPost({
    action: "getBookingsByPhone",
    phone
  });
}

async function apiGetBookingsByDate(date) {
  return apiPost({
    action: "getBookingsByDate",
    date
  });
}

async function apiAddBooking(data) {
  return apiPost({
    action: "addBooking",
    ...data
  });
}

/* ===========================
   Services / Commissions
=========================== */

async function apiGetServices() {
  return apiPost({
    action: "getServices"
  });
}

async function apiGetServicesByCategory(category) {
  return apiPost({
    action: "getServicesByCategory",
    category
  });
}

async function apiGetCarTypes() {
  return apiPost({
    action: "getCarTypes"
  });
}

/* ===========================
   Employees
=========================== */

async function apiGetEmployees() {
  return apiPost({
    action: "getEmployees"
  });
}

/* ===========================
   Branches
=========================== */

async function apiGetBranches() {
  return apiPost({
    action: "getBranches"
  });
}

/* ===========================
   Payroll
=========================== */

async function apiCalculatePayrollByEmployee(employee, from, to) {
  return apiPost({
    action: "calculatePayrollByEmployee",
    employee,
    from,
    to
  });
}

async function apiAddPayroll(data) {
  return apiPost({
    action: "addPayroll",
    ...data
  });
}

/* ===========================
   Notifications
=========================== */

async function apiAddNotification(data) {
  return apiPost({
    action: "addNotification",
    ...data
  });
}

async function apiGetNotifications(phone) {
  return apiPost({
    action: "getNotifications",
    phone
  });
}

async function apiMarkNotificationRead(row) {
  return apiPost({
    action: "markNotificationRead",
    row
  });
}

/* ===========================
   Levels
=========================== */

async function apiGetLevels() {
  return apiPost({
    action: "getLevels"
  });
}
/* ===========================
   Update Booking Status
=========================== */
async function apiUpdateBookingStatus(phone, status) {
    return apiPost({
        action: "updateBookingStatus",
        phone,
        status
    });
}

/* ===========================
   Update Booking Date & Time
=========================== */
async function apiUpdateBookingDate(phone, date, time) {
    return apiPost({
        action: "updateBookingDate",
        phone,
        date,
        time
    });
}

/* ===========================
   Universal Row Operations
=========================== */

async function apiUpdateRow(sheet, row, values) {
  return apiPost({
    action: "updateRow",
    sheet,
    row,
    values: JSON.stringify(values)
  });
}

async function apiDeleteRow(sheet, row) {
  return apiPost({
    action: "deleteRow",
    sheet,
    row
  });
}

async function apiAddRow(sheet, values) {
  return apiPost({
    action: "addRow",
    sheet,
    values: JSON.stringify(values)
  });
}
