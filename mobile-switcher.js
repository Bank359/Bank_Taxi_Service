document.addEventListener("DOMContentLoaded", () => {

    const STORAGE_KEY = "BANK_TAXI_MOBILE_MODE";
    const THEME_STORAGE_KEY = "BANK_TAXI_THEME_MODE";

    // =========================================================
    // ป้องกันระบบถูกสร้างซ้ำ
    // =========================================================

    if (document.getElementById("bankTaxiMobileSystem")) {
        return;
    }


    // =========================================================
    // ตรวจภาษาและหน้าปัจจุบัน
    // =========================================================

    const currentFile =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase() || "index.html";

    const isEnglish = currentFile.includes("-en.html");

    // ตรวจสอบว่าเป็นหน้า "รถของเรา" (cars.html หรือ cars-en.html) หรือไม่
    const isCarsPage = currentFile.includes("cars");


    // =========================================================
    // เมนู
    // =========================================================

    const menus = isEnglish
        ? [
            {
                text: "Home",
                icon: "⌂",
                normal: "index.html",
                english: "index-en.html"
            },
            {
                text: "Cars",
                icon: "🚕",
                normal: "cars.html",
                english: "cars-en.html"
            },
            {
                text: "Services",
                icon: "⚙️",
                normal: "services.html",
                english: "services-en.html"
            },
            {
                text: "Booking",
                icon: "📅",
                normal: "booking.html",
                english: "booking-en.html"
            },
            {
                text: "Contact",
                icon: "✉️",
                normal: "contact.html",
                english: "contact-en.html"
            }
        ]
        : [
            {
                text: "หน้าหลัก",
                icon: "⌂",
                normal: "index.html",
                english: "index-en.html"
            },
            {
                text: "รถของเรา",
                icon: "🚕",
                normal: "cars.html",
                english: "cars-en.html"
            },
            {
                text: "บริการ",
                icon: "⚙️",
                normal: "services.html",
                english: "services-en.html"
            },
            {
                text: "จองรถ",
                icon: "📅",
                normal: "booking.html",
                english: "booking-en.html"
            },
            {
                text: "ติดต่อเรา",
                icon: "✉️",
                normal: "contact.html",
                english: "contact-en.html"
            }
        ];


    // =========================================================
    // SVG ไอคอน
    // =========================================================

    const svgMobile = `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
            <line x1="12" y1="18" x2="12.01" y2="18"></line>
        </svg>
    `;

    const svgDesktop = `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
    `;


    // =========================================================
    // สร้างระบบ Mobile
    // =========================================================

    const system = document.createElement("div");

    system.id = "bankTaxiMobileSystem";

    system.innerHTML = `

        <!-- ==============================================
             MOBILE HEADER
        =============================================== -->

        <header id="bankMobileHeader">

            <button
                id="bankMobileMenuButton"
                type="button"
                aria-label="เปิดเมนู"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>


            <div id="bankMobileBrand">

                <div class="bankMobileLogo" style="width: 36px; height: 36px; background: transparent; box-shadow: none;">
                    <img src="https://img2.pic.in.th/banktaxiservicee5a11d6497bc7a05.png" alt="Bank Taxi Service Logo" style="width: 100%; height: 100%; object-fit: contain;">
                </div>

                <div class="bankMobileBrandText">
                    <strong>Bank Taxi Service</strong>
                    <small>
                        ${isEnglish
                            ? "Taxi Service"
                            : "บริการรถแท็กซี่"}
                    </small>
                </div>

            </div>


            <div class="bankMobileHeaderRight"></div>

        </header>


        <!-- ==============================================
             DRAWER OVERLAY
        =============================================== -->

        <div id="bankMobileOverlay"></div>


        <!-- ==============================================
             DRAWER (พร้อมปุ่มเปลี่ยนภาษาและโหมดสว่าง/ทึบด้านใน)
        =============================================== -->

        <aside id="bankMobileDrawer">

            <div class="bankDrawerHeader">

                <div class="bankDrawerBrand">

                    <div class="bankDrawerLogo" style="width: 40px; height: 40px; background: transparent; box-shadow: none;">
                        <img src="https://img2.pic.in.th/banktaxiservicee5a11d6497bc7a05.png" alt="Logo" style="width: 100%; height: 100%; object-fit: contain;">
                    </div>

                    <div>

                        <strong>Bank Taxi</strong>

                        <small>
                            ${isEnglish
                                ? "Taxi Service"
                                : "บริการรถแท็กซี่"}
                        </small>

                    </div>

                </div>


                <button
                    id="bankDrawerClose"
                    type="button"
                    aria-label="ปิดเมนู"
                >
                    ×
                </button>

            </div>


            <!-- แผงสลับภาษาด้านในเมนู 3 ขีด -->
            <div class="bankDrawerLangBox">
                <span class="bankLangTitle">${isEnglish ? "Language / ภาษา" : "ภาษา / Language"}</span>
                <div class="bankLangSwitchGroup">
                    <a href="${currentFile.includes("-en.html") ? currentFile.replace("-en.html", ".html") : currentFile}" class="bankDrawerLangBtn ${!isEnglish ? 'active' : ''}" onclick="if(typeof setLanguage === 'function'){ setLanguage('th'); }">
                        🇹🇭 ไทย
                    </a>
                    <a href="${currentFile.includes("-en.html") ? currentFile : (currentFile === "" || currentFile === "index.html" ? "index-en.html" : currentFile.replace(".html", "-en.html"))}" class="bankDrawerLangBtn ${isEnglish ? 'active' : ''}" onclick="if(typeof setLanguage === 'function'){ setLanguage('en'); }">
                        🇬🇧 English
                    </a>
                </div>
            </div>


            <!-- แผงสลับโหมดสว่าง / ทึบ (Theme Mode) ด้านในเมนู -->
            <div class="bankDrawerLangBox" style="margin-top: 10px;">
                <span class="bankLangTitle">${isEnglish ? "Theme / ธีมหน้าจอ" : "ธีมหน้าจอ / Theme"}</span>
                <div class="bankLangSwitchGroup">
                    <button type="button" id="bankThemeLight" class="bankDrawerLangBtn" onclick="setThemeMode('light')">
                        ☀️ ${isEnglish ? "Light" : "สว่าง"}
                    </button>
                    <button type="button" id="bankThemeDark" class="bankDrawerLangBtn" onclick="setThemeMode('dark')">
                        🌙 ${isEnglish ? "Dark" : "ทึบ"}
                    </button>
                </div>
            </div>


            <div class="bankDrawerLine"></div>


            <nav class="bankDrawerNav">

                ${menus.map(item => {

                    const url =
                        isEnglish
                            ? item.english
                            : item.normal;

                    return `

                        <a
                            href="${url}"
                            class="bankDrawerItem"
                        >

                            <span class="bankDrawerIcon">
                                ${item.icon}
                            </span>

                            <span class="bankDrawerText">
                                ${item.text}
                            </span>

                            <span class="bankDrawerArrow">
                                ›
                            </span>

                        </a>

                    `;

                }).join("")}

            </nav>


            ${!isCarsPage ? `
            <div class="bankDrawerFooter">
                <span class="bankOnlineDot"></span>
                <span>
                    ${isEnglish
                        ? "Service available"
                        : "พร้อมให้บริการ"}
                </span>
            </div>
            ` : ''}

        </aside>


        <!-- ==============================================
             SWITCH BUTTON
        ============================================== -->

        <button
            id="bankMobileSwitch"
            type="button"
            title="สลับโหมดมือถือ"
            aria-label="สลับโหมดมือถือ"
        >

            <span class="bankSwitchIcon">
                ${svgMobile}
            </span>

            <span class="bankSwitchStatus"></span>

        </button>

    `;


    document.body.appendChild(system);


    // =========================================================
    // CSS
    // =========================================================

    const style = document.createElement("style");

    style.id = "bankTaxiMobileCSS";

    style.textContent = `

   #bankTaxiMobileSystem {
        display: block !important;
    }

    #bankMobileHeader,
    #bankMobileDrawer,
    #bankMobileOverlay {
        display: none;
    }

    body.bank-mobile-mode #bankMobileHeader {
        display: flex;
    }

    body.bank-mobile-mode #bankMobileDrawer {
        display: flex;
    }

    body.bank-mobile-mode #bankMobileOverlay {
        display: block;
    }

    body.bank-mobile-mode {
        overflow-x: hidden !important;
        width: 100% !important;
        padding-top: 60px !important;
    }

    /* ซ่อน Navbar / Header เดิมของเว็บไซต์เมื่อเปิดโหมดมือถือ */
    body.bank-mobile-mode header:not(#bankMobileHeader),
    body.bank-mobile-mode nav:not(.bankDrawerNav),
    body.bank-mobile-mode .navbar,
    body.bank-mobile-mode .nav-container {
        display: none !important;
    }

    /* ซ่อน Footer เฉพาะในหน้า Cars เมื่ออยู่ในโหมดมือถือ */
    ${isCarsPage ? `
    body.bank-mobile-mode footer,
    body.bank-mobile-mode .footer,
    body.bank-mobile-mode .bankDrawerFooter {
        display: none !important;
    }
    ` : ''}

    body.bank-mobile-mode #bankTaxiMobileSystem {
        display: block;
    }

    /* ธีมสว่าง (Light Mode) สำหรับ Header และ Drawer */
    body.bank-theme-light #bankMobileHeader {
        background: rgba(255, 255, 255, 0.95) !important;
        border-bottom-color: rgba(15, 23, 42, 0.08) !important;
    }
    body.bank-theme-light .bankMobileBrandText strong {
        color: #0f172a !important;
    }
    body.bank-theme-light .bankMobileBrandText small {
        color: #64748b !important;
    }
    body.bank-theme-light #bankMobileMenuButton span {
        background: #1e293b !important;
    }
    body.bank-theme-light #bankMobileDrawer {
        background: #ffffff !important;
        color: #334155 !important;
    }
    body.bank-theme-light .bankDrawerBrand strong {
        color: #0f172a !important;
    }
    body.bank-theme-light .bankDrawerItem {
        color: #334155 !important;
    }
    body.bank-theme-light .bankDrawerItem:hover {
        background: #f1f5f9 !important;
    }

    /* ธีมทึบ (Dark Mode) สำหรับ Header และ Drawer */
    body.bank-theme-dark #bankMobileHeader {
        background: rgba(15, 23, 42, 0.95) !important;
        border-bottom-color: rgba(255, 255, 255, 0.1) !important;
    }
    body.bank-theme-dark .bankMobileBrandText strong {
        color: #f8fafc !important;
    }
    body.bank-theme-dark .bankMobileBrandText small {
        color: #94a3b8 !important;
    }
    body.bank-theme-dark #bankMobileMenuButton span {
        background: #f8fafc !important;
    }
    body.bank-theme-dark #bankMobileDrawer {
        background: #0f172a !important;
        color: #f8fafc !important;
    }
    body.bank-theme-dark .bankDrawerBrand strong {
        color: #f8fafc !important;
    }
    body.bank-theme-dark .bankDrawerBrand small {
        color: #94a3b8 !important;
    }
    body.bank-theme-dark #bankDrawerClose {
        background: #1e293b !important;
        color: #f8fafc !important;
    }
    body.bank-theme-dark .bankDrawerLangBox {
        background: #1e293b !important;
        border-color: #334155 !important;
    }
    body.bank-theme-dark .bankDrawerLangBtn {
        background: #0f172a !important;
        border-color: #334155 !important;
        color: #f8fafc !important;
    }
    body.bank-theme-dark .bankDrawerItem {
        color: #f8fafc !important;
    }
    body.bank-theme-dark .bankDrawerItem:hover {
        background: #1e293b !important;
    }
    body.bank-theme-dark .bankDrawerFooter {
        background: #1e293b !important;
        color: #94a3b8 !important;
    }


    /* MOBILE HEADER */
    body.bank-mobile-mode #bankMobileHeader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 60px;
        z-index: 9000;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: 0 15px;
        backdrop-filter: blur(15px);
        -webkit-backdrop-filter: blur(15px);
        box-shadow: 0 4px 20px rgba(15, 23, 42, 0.05);
    }

    #bankMobileMenuButton {
        width: 42px;
        height: 42px;
        flex-shrink: 0;
        border: none;
        outline: none;
        background: transparent;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 5px;
        cursor: pointer;
        transition: background 0.2s ease;
    }

    #bankMobileMenuButton span {
        width: 22px;
        height: 2.5px;
        border-radius: 4px;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        transform-origin: center;
    }

    body.bank-drawer-open #bankMobileMenuButton span:nth-child(1) {
        transform: translateY(7.5px) rotate(45deg);
    }
    body.bank-drawer-open #bankMobileMenuButton span:nth-child(2) {
        opacity: 0;
        transform: scale(0);
    }
    body.bank-drawer-open #bankMobileMenuButton span:nth-child(3) {
        transform: translateY(-7.5px) rotate(-45deg);
    }


    /* HEADER BRAND */
    #bankMobileBrand {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        min-width: 0;
        transform: translateY(-2px);
    }

    .bankMobileBrandText {
        line-height: 1.1;
    }

    .bankMobileBrandText strong {
        display: block;
        font-size: 14px;
        font-weight: 800;
        letter-spacing: .2px;
    }

    .bankMobileBrandText small {
        display: block;
        margin-top: 2px;
        font-size: 10px;
    }

    .bankMobileHeaderRight {
        width: 42px;
        flex-shrink: 0;
    }


    /* DRAWER OVERLAY */
    #bankMobileOverlay {
        position: fixed;
        inset: 0;
        z-index: 9998;
        background: rgba(15, 23, 42, 0.45);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transition: opacity 0.3s ease, visibility 0.3s ease;
    }

    #bankMobileOverlay.bank-open {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
    }


    /* DRAWER */
    #bankMobileDrawer {
        position: fixed;
        top: 0;
        left: 0;
        width: 290px;
        max-width: 82vw;
        height: 100vh;
        z-index: 9999;
        box-sizing: border-box;
        padding: 20px;
        box-shadow: 15px 0 45px rgba(15, 23, 42, 0.18);
        transform: translateX(-110%);
        transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        flex-direction: column;
        overflow-y: auto;
    }

    #bankMobileDrawer.bank-open {
        transform: translateX(0);
    }

    body.bank-drawer-open #bankMobileSwitch {
        opacity: 0 !important;
        visibility: hidden !important;
        pointer-events: none !important;
        transform: scale(0.8) !important;
        transition: all 0.25s ease !important;
    }

    .bankDrawerHeader {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .bankDrawerBrand {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .bankDrawerBrand strong {
        display: block;
        font-size: 15px;
        font-weight: 700;
    }

    .bankDrawerBrand small {
        display: block;
        margin-top: 2px;
        font-size: 11px;
    }

    #bankDrawerClose {
        width: 36px;
        height: 36px;
        border: none;
        border-radius: 50%;
        font-size: 22px;
        line-height: 1;
        cursor: pointer;
        transition: 0.25s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #bankDrawerClose:hover {
        transform: rotate(90deg);
    }


    /* กล่องเปลี่ยนภาษา/ธีมในเมนู 3 ขีด */
    .bankDrawerLangBox {
        margin-top: 18px;
        padding: 12px;
        border-radius: 12px;
        border: 1px solid transparent;
    }

    .bankLangTitle {
        display: block;
        font-size: 11px;
        font-weight: 700;
        margin-bottom: 8px;
        text-transform: uppercase;
        letter-spacing: .5px;
        color: #64748b;
    }

    .bankLangSwitchGroup {
        display: flex;
        gap: 8px;
    }

    .bankDrawerLangBtn {
        flex: 1;
        text-align: center;
        padding: 8px;
        border-radius: 8px;
        font-size: 13px;
        font-weight: 600;
        text-decoration: none;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .bankDrawerLangBtn.active,
    .bankDrawerLangBtn.bank-theme-active {
        background: linear-gradient(135deg, #667eea, #5a67d8);
        border-color: transparent !important;
        color: #ffffff !important;
        box-shadow: 0 4px 10px rgba(102, 126, 234, 0.3);
    }

    .bankDrawerLine {
        width: 100%;
        height: 1px;
        background: #e5e7eb;
        margin: 16px 0;
    }


    /* DRAWER MENU */
    .bankDrawerNav {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .bankDrawerItem {
        width: 100%;
        min-height: 52px;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        gap: 12px;
        padding: 8px 10px;
        border-radius: 12px;
        text-decoration: none;
        transition: background 0.2s ease, transform 0.2s ease, color 0.2s ease;
    }

    .bankDrawerItem:hover {
        transform: translateX(3px);
    }

    .bankDrawerItem.bank-current {
        background: linear-gradient(135deg, #eef2ff, #f5f3ff);
        color: #4f46e5;
        font-weight: 700;
    }

    .bankDrawerIcon {
        width: 36px;
        height: 36px;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        background: #f8fafc;
        font-size: 16px;
    }

    .bankDrawerText {
        flex: 1;
        font-size: 14px;
        font-weight: 600;
    }

    .bankDrawerArrow {
        font-size: 20px;
        color: #cbd5e1;
    }


    /* DRAWER FOOTER */
    .bankDrawerFooter {
        margin-top: auto;
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 12px;
        border-radius: 10px;
        font-size: 12px;
    }

    .bankOnlineDot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #22c55e;
        box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.15);
    }


    /* ปุ่มสลับโหมดพรีเมียม (ซ้ายล่าง) */
    #bankMobileSwitch {
        position: fixed !important;
        left: 20px !important;
        bottom: 20px !important;
        width: 52px !important;
        height: 52px !important;
        z-index: 99999 !important;
        border: 1px solid rgba(255, 255, 255, 0.35);
        border-radius: 50%;
        display: flex !important;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        background: linear-gradient(145deg, #667eea, #5a67d8);
        color: white;
        box-shadow: 0 8px 25px rgba(102, 126, 234, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.5), inset 0 -2px 4px rgba(0, 0, 0, 0.2);
        transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
    }

    #bankMobileSwitch:hover {
        transform: translateY(-4px) scale(1.08);
        background: linear-gradient(145deg, #748ffc, #667eea);
        box-shadow: 0 14px 28px rgba(102, 126, 234, 0.6), inset 0 1px 2px rgba(255, 255, 255, 0.7), inset 0 -2px 4px rgba(0, 0, 0, 0.25);
    }

    .bankSwitchIcon {
        display: flex;
        align-items: center;
        justify-content: center;
        filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.25));
        transition: transform 0.3s ease;
    }

    .bankSwitchStatus {
        position: absolute;
        right: 3px;
        bottom: 3px;
        width: 11px;
        height: 11px;
        border-radius: 50%;
        border: 2px solid #ffffff;
        background: #22c55e;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    `;

    document.head.appendChild(style);


    // =========================================================
    // ELEMENTS & LOGIC
    // =========================================================

    const menuButton = document.getElementById("bankMobileMenuButton");
    const drawer = document.getElementById("bankMobileDrawer");
    const overlay = document.getElementById("bankMobileOverlay");
    const closeButton = document.getElementById("bankDrawerClose");
    const switchButton = document.getElementById("bankMobileSwitch");

    function openDrawer() {
        drawer.classList.add("bank-open");
        overlay.classList.add("bank-open");
        document.body.classList.add("bank-drawer-open");
    }

    function closeDrawer() {
        drawer.classList.remove("bank-open");
        overlay.classList.remove("bank-open");
        document.body.classList.remove("bank-drawer-open");
    }

    menuButton.addEventListener("click", () => {
        if (drawer.classList.contains("bank-open")) {
            closeDrawer();
        } else {
            openDrawer();
        }
    });

    closeButton.addEventListener("click", closeDrawer);
    overlay.addEventListener("click", closeDrawer);

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") closeDrawer();
    });

    // Active menu state
    document.querySelectorAll(".bankDrawerItem").forEach(link => {
        const href = link.getAttribute("href").toLowerCase();
        if (href === currentFile || (currentFile === "" && href === "index.html")) {
            link.classList.add("bank-current");
        }
        link.addEventListener("click", closeDrawer);
    });

    // ฟังก์ชันควบคุมการเปลี่ยนธีม (Light / Dark)
    window.setThemeMode = function(mode) {
        const lightBtn = document.getElementById("bankThemeLight");
        const darkBtn = document.getElementById("bankThemeDark");

        if (mode === "dark") {
            document.body.classList.add("bank-theme-dark");
            document.body.classList.remove("bank-theme-light");
            if (lightBtn && darkBtn) {
                lightBtn.classList.remove("bank-theme-active");
                darkBtn.classList.add("bank-theme-active");
            }
            localStorage.setItem(THEME_STORAGE_KEY, "dark");
        } else {
            document.body.classList.add("bank-theme-light");
            document.body.classList.remove("bank-theme-dark");
            if (lightBtn && darkBtn) {
                darkBtn.classList.remove("bank-theme-active");
                lightBtn.classList.add("bank-theme-active");
            }
            localStorage.setItem(THEME_STORAGE_KEY, "light");
        }
    };

    // โหลดค่าธีมที่บันทึกไว้ (ค่าเริ่มต้นเป็นสว่าง light)
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || "light";
    setThemeMode(savedTheme);

    function applyMobileMode(enabled) {
        const iconContainer = switchButton.querySelector(".bankSwitchIcon");
        const status = switchButton.querySelector(".bankSwitchStatus");

        if (enabled) {
            document.body.classList.add("bank-mobile-mode");
            iconContainer.innerHTML = svgDesktop;
            status.style.background = "#f59e0b";
            switchButton.title = isEnglish ? "Switch to Desktop" : "กลับโหมดเดสก์ท็อป";
        } else {
            document.body.classList.remove("bank-mobile-mode");
            iconContainer.innerHTML = svgMobile;
            status.style.background = "#22c55e";
            switchButton.title = isEnglish ? "Switch to Mobile" : "สลับโหมดมือถือ";
            closeDrawer();
        }
    }

    const savedMode = localStorage.getItem(STORAGE_KEY) === "true";
    applyMobileMode(savedMode);

    switchButton.addEventListener("click", () => {
        const current = document.body.classList.contains("bank-mobile-mode");
        const next = !current;

        localStorage.setItem(STORAGE_KEY, String(next));

        const iconContainer = switchButton.querySelector(".bankSwitchIcon");
        iconContainer.style.transform = "rotate(180deg) scale(0.7)";

        setTimeout(() => {
            applyMobileMode(next);
            iconContainer.style.transform = "rotate(0deg) scale(1)";
        }, 160);
    });

});