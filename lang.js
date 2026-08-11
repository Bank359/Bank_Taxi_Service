const translations = {
    th: {
        // เมนูหลัก
        home: "Home",
        services: "Services & Rates",
        cars: "Cars",
        booking: "Booking",
        contact: "Contact",

        // หน้า Cars / ทั่วไป
        title: "ประเภทรถและอัตราค่าบริการ - Bank Taxi Service",
        heading: "ประเภทรถและอัตราค่าบริการ",
        subheading: "เลือกเลื่อนดูขบวนรถของเรา พร้อมรายละเอียดคนขับ จำนวนที่นั่ง และพื้นที่สัมภาระ",

        // หน้า Booking (ระบบจองรถและประเมินราคา)
        booking_title: "ระบบจองรถและประเมินราคา | Bank Taxi Service",
        booking_main_heading: "ระบบจองรถและประเมินราคา",
        booking_main_subheading: "สะดวก รวดเร็ว พร้อมให้บริการคุณตลอด 24 ชั่วโมง ทั่วไทย",
        form_heading: "แบบฟอร์มจองรถและประเมินราคา",
        label_name: "ชื่อ-นามสกุล",
        label_phone: "เบอร์โทรศัพท์ (10 หลัก)",
        label_lineid: "ไอดีไลน์ (LINE ID)",
        label_email: "อีเมล (สำหรับรับหลักฐานการจอง)",
        label_car: "เลือกประเภทรถ",
        label_route: "เลือกเส้นทาง",
        label_estimate_price: "ราคาประเมินเบื้องต้น",
        label_notes: "หมายเหตุพิเศษ / ความต้องการเพิ่มเติม",
        
        // ตัวเลือกใน Dropdown รถ
        car_default: "-- กรุณาเลือกรถยนต์ --",
        camry_opt: "Toyota Camry (1-3 ที่นั่ง)",
        fortuner_opt: "Toyota Fortuner (4-5 ที่นั่ง)",
        commuter_opt: "Toyota Commuter (9-10 ที่นั่ง)",
        route_default: "-- กรุณาเลือกรถก่อน --",

        // เงื่อนไขและปุ่ม
        price_note: "ยกเลิกไม่คืนค่ามัดจำ | บวกเพิ่มคนละ 100-200 บาท",
        btn_submit: "ยืนยันการจองและชำระมัดจำ 100 บาท",
        deposit_alert: "ยอดมัดจำยืนยันการจอง: 100 บาท (ส่วนที่เหลือชำระกับคนขับวันเดินทาง)",
        qr_heading: "กรุณาสแกน QR Code เพื่อชำระเงินมัดจำ 100 บาท",
        qr_subheading: "เมื่อโอนเงินแล้ว โปรดแนบสลิปเพื่อส่งหลักฐานการจองเข้าสู่อีเมลและแจ้งเตือนผ่าน LINE อัตโนมัติ",
        bank_name: "Bank Taxi Service (PromptPay)",
        label_slip: "แนบสลิปหลักฐานการโอนเงิน (มัดจำ 100 บาท)",
        btn_finalize: "ส่งหลักฐานการจอง (แจ้งเตือนเข้า LINE & Email)"
    },
    en: {
        // เมนูหลัก
        home: "Home",
        services: "Services & Rates",
        cars: "Cars",
        booking: "Booking",
        contact: "Contact",

        // หน้า Cars / ทั่วไป
        title: "Vehicle Types & Rates - Bank Taxi Service",
        heading: "Vehicle Types & Rates",
        subheading: "Explore our fleet with detailed driver info, seating capacity, and luggage space.",

        // หน้า Booking (ระบบจองรถและประเมินราคา)
        booking_title: "Car Rental & Fare Estimation | Bank Taxi Service",
        booking_main_heading: "Online Car Booking & Fare Estimation",
        booking_main_subheading: "Convenient, fast, and available 24 hours a day across Thailand.",
        form_heading: "Booking Form & Fare Estimation",
        label_name: "Full Name",
        label_phone: "Phone Number (10 digits)",
        label_lineid: "LINE ID",
        label_email: "Email (for booking confirmation)",
        label_car: "Select Vehicle Type",
        label_route: "Select Route",
        label_estimate_price: "Estimated Fare",
        label_notes: "Special Notes / Additional Requirements",
        
        // ตัวเลือกใน Dropdown รถ
        car_default: "-- Please select a vehicle --",
        camry_opt: "Toyota Camry (1-3 seats)",
        fortuner_opt: "Toyota Fortuner (4-5 seats)",
        commuter_opt: "Toyota Commuter (9-10 seats)",
        route_default: "-- Please select a vehicle first --",

        // เงื่อนไขและปุ่ม
        price_note: "Deposit non-refundable upon cancellation | Extra charge 100-200 THB per person",
        btn_submit: "Confirm Booking & Pay 100 THB Deposit",
        deposit_alert: "Booking Confirmation Deposit: 100 THB (Balance payable to driver on travel day)",
        qr_heading: "Please Scan QR Code to Pay 100 THB Deposit",
        qr_subheading: "After transferring, please attach your transfer slip below to send booking details to your email and LINE automatically.",
        bank_name: "Bank Taxi Service (PromptPay)",
        label_slip: "Attach Transfer Slip (100 THB Deposit)",
        btn_finalize: "Submit Booking Proof (LINE & Email Notification)"
    }
};

function applyLanguage(lang) {
    // เปลี่ยนข้อความตาม attribute data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // เปลี่ยน placeholder ตาม attribute data-i18n-placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[lang] && translations[lang][key]) {
            element.setAttribute('placeholder', translations[lang][key]);
        }
    });

    // อัปเดตสถานะปุ่ม Active
    document.querySelectorAll('.lang-btn').forEach(btn => {
        const isMatch = btn.dataset.lang === lang || btn.textContent.trim().toLowerCase() === lang;
        btn.classList.toggle('active', isMatch);
    });
}

function setLanguage(lang) {
    localStorage.setItem('selectedLang', lang); // บันทึกภาษาลงในเบราว์เซอร์
    applyLanguage(lang);
}

// โหลดภาษาอัตโนมัติเมื่อเปิดหน้าเว็บ
document.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem('selectedLang') || 'th';
    applyLanguage(savedLang);

    // ผูก Event ให้ปุ่มสลับภาษาเปลี่ยนค่าได้ทันทีทุกลิงก์
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = btn.dataset.lang || (btn.textContent.trim().toLowerCase() === 'th' ? 'th' : 'en');
            setLanguage(lang);
        });
    });
});