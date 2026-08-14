const translations = { 
    th: { 
        home: "หน้าแรก", 
        services: "บริการและค่าธรรมเนียม", 
        cars: "รถยนต์", 
        booking: "จองรถ", 
        contact: "ติดต่อเรา", 
        title: "ประเภทรถและอัตราค่าบริการ - Bank Taxi Service", 
        heading: "ประเภทรถและอัตราค่าบริการ", 
        subheading: "เลือกเลื่อนดูขบวนรถของเรา พร้อมรายละเอียดคนขับ จำนวนที่นั่ง และพื้นที่สัมภาระ", 
        label_date: "วันที่นัดหมายเดินทาง", 
        label_time: "เวลานัดหมายเดินทาง", 
    }, 
    en: { 
        home: "Home", 
        services: "Services & Rates", 
        cars: "Cars", 
        booking: "Booking", 
        contact: "Contact", 
        title: "Vehicle Types & Rates - Bank Taxi Service", 
        heading: "Vehicle Types & Rates", 
        subheading: "Explore our fleet with detailed driver info, seating capacity, and luggage space.", 
        label_date: "Travel Date", 
        label_time: "Travel Time", 
    } 
}; 

function applyLanguage(lang) { 
    // 1. เปลี่ยนข้อความทั้งหมดที่มี attribute data-i18n ในหน้านั้นๆ
    document.querySelectorAll('[data-i18n]').forEach(el => { 
        const key = el.getAttribute('data-i18n'); 
        if (translations[lang] && translations[lang][key]) { 
            // รองรับทั้ง textContent ทั่วไป และ placeholder ของ input
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translations[lang][key];
            } else {
                el.textContent = translations[lang][key]; 
            }
        } 
    }); 
    
    // 2. สลับสถานะ active ของปุ่มเปลี่ยนภาษา (รองรับทุกหน้าที่มีปุ่ม .lang-btn)
    document.querySelectorAll('.lang-btn').forEach(btn => { 
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang); 
    }); 

    // 3. เปลี่ยนภาษาของแท็บเว็บ (Title) ถ้ามี
    if (translations[lang]['title']) {
        document.title = translations[lang]['title'];
    }
} 

document.addEventListener("DOMContentLoaded", () => { 
    // โหลดภาษาที่บันทึกไว้ล่าสุด หรือค่าเริ่มต้นเป็น 'th'
    const savedLang = localStorage.getItem('selectedLang') || 'th'; 
    applyLanguage(savedLang); 

    // ผูก Event ให้กับปุ่มเปลี่ยนภาษาทุกปุ่มในหน้านั้นๆ
    document.querySelectorAll('.lang-btn').forEach(btn => { 
        btn.addEventListener('click', (e) => { 
            e.preventDefault(); 
            const lang = btn.getAttribute('data-lang'); 
            localStorage.setItem('selectedLang', lang); // บันทึกค่าลงหน่วยความจำเบราว์เซอร์
            applyLanguage(lang); // เปลี่ยนภาษาทันทีในหน้าปัจจุบัน
        }); 
    }); 
});