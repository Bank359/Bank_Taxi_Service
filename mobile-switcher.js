document.addEventListener("DOMContentLoaded", () => {

    const STORAGE_KEY = "BANK_TAXI_MOBILE_MODE";

    // =========================================================
    // ป้องกันระบบถูกสร้างซ้ำ
    // =========================================================

    if (document.getElementById("bankTaxiMobileSystem")) {
        return;
    }


    // =========================================================
    // ตรวจภาษา
    // =========================================================

    const currentFile =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();

    const isEnglish = currentFile.includes("-en.html");


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
    // SVG ไอคอนสมจริง (เปลี่ยนแทนอีโมจิเดิม)
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

                <div class="bankMobileLogo">
                    🚕
                </div>

                <div class="bankMobileBrandText">
                    <strong>BANK TAXI</strong>
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
             DRAWER
        =============================================== -->

        <aside id="bankMobileDrawer">

            <div class="bankDrawerHeader">

                <div class="bankDrawerBrand">

                    <div class="bankDrawerLogo">
                        🚕
                    </div>

                    <div>

                        <strong>BANK TAXI</strong>

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


            <div class="bankDrawerFooter">

                <span class="bankOnlineDot"></span>

                <span>
                    ${isEnglish
                        ? "Service available"
                        : "พร้อมให้บริการ"}
                </span>

            </div>

        </aside>


        <!-- ==============================================
             NEW MOBILE/DESKTOP SWITCH (ใช้ SVG สมจริง)
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

    /* =========================================================
        ระบบหลัก
    ========================================================= */

    #bankTaxiMobileSystem {
        display: none;
    }


    /* =========================================================
        MOBILE MODE
    ========================================================= */

    body.bank-mobile-mode {
        overflow-x: hidden !important;
        width: 100% !important;
    }


    body.bank-mobile-mode #bankTaxiMobileSystem {
        display: block;
    }


    /* =========================================================
        MOBILE HEADER
    ========================================================= */

    body.bank-mobile-mode #bankMobileHeader {

        position: fixed;

        top: 0;
        left: 0;

        width: 100%;
        height: 64px;

        z-index: 9000;

        display: flex;
        align-items: center;

        box-sizing: border-box;

        padding: 0 15px;

        background:
            rgba(255,255,255,.96);

        backdrop-filter: blur(18px);
        -webkit-backdrop-filter: blur(18px);

        border-bottom:
            1px solid rgba(15,23,42,.08);

        box-shadow:
            0 4px 20px rgba(15,23,42,.06);
    }


    /* =========================================================
        HAMBURGER
    ========================================================= */

    #bankMobileMenuButton {

        width: 44px;
        height: 44px;

        flex-shrink: 0;

        border: none;
        outline: none;

        background: transparent;

        border-radius: 12px;

        display: flex;

        flex-direction: column;

        align-items: center;
        justify-content: center;

        gap: 5px;

        cursor: pointer;
    }


    #bankMobileMenuButton span {

        width: 23px;
        height: 2.5px;

        border-radius: 10px;

        background: #172033;

        transition: .25s ease;
    }


    #bankMobileMenuButton:hover {
        background: #f1f5f9;
    }


    /* =========================================================
        HEADER BRAND
    ========================================================= */

    #bankMobileBrand {

        flex: 1;

        display: flex;

        align-items: center;
        justify-content: center;

        gap: 9px;

        min-width: 0;
    }


    .bankMobileLogo {

        width: 35px;
        height: 35px;

        flex-shrink: 0;

        display: flex;

        align-items: center;
        justify-content: center;

        border-radius: 11px;

        background:
            linear-gradient(
                135deg,
                #667eea,
                #764ba2
            );

        font-size: 18px;

        box-shadow:
            0 5px 14px
            rgba(102,126,234,.25);
    }


    .bankMobileBrandText {
        line-height: 1.1;
    }


    .bankMobileBrandText strong {

        display: block;

        font-size: 15px;

        font-weight: 800;

        color: #111827;

        letter-spacing: .3px;
    }


    .bankMobileBrandText small {

        display: block;

        margin-top: 3px;

        font-size: 10px;

        color: #94a3b8;
    }


    .bankMobileHeaderRight {

        width: 44px;

        flex-shrink: 0;
    }


    /* =========================================================
        DRAWER OVERLAY
    ========================================================= */

    #bankMobileOverlay {

        position: fixed;

        inset: 0;

        z-index: 9998;

        background:
            rgba(15,23,42,.40);

        backdrop-filter:
            blur(3px);

        -webkit-backdrop-filter:
            blur(3px);

        opacity: 0;

        visibility: hidden;

        pointer-events: none;

        transition:
            opacity .3s ease,
            visibility .3s ease;
    }


    #bankMobileOverlay.bank-open {

        opacity: 1;

        visibility: visible;

        pointer-events: auto;
    }


    /* =========================================================
        DRAWER
    ========================================================= */

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

        background: #ffffff;

        box-shadow:
            15px 0 45px
            rgba(15,23,42,.16);

        transform:
            translateX(-110%);

        transition:
            transform
            .35s
            cubic-bezier(.22,1,.36,1);

        display: flex;

        flex-direction: column;
    }


    #bankMobileDrawer.bank-open {

        transform:
            translateX(0);
    }


    /* =========================================================
        DRAWER HEADER
    ========================================================= */

    .bankDrawerHeader {

        display: flex;

        align-items: center;

        justify-content: space-between;
    }


    .bankDrawerBrand {

        display: flex;

        align-items: center;

        gap: 12px;
    }


    .bankDrawerLogo {

        width: 47px;
        height: 47px;

        display: flex;

        align-items: center;
        justify-content: center;

        border-radius: 14px;

        font-size: 23px;

        background:
            linear-gradient(
                135deg,
                #667eea,
                #764ba2
            );

        box-shadow:
            0 8px 20px
            rgba(102,126,234,.25);
    }


    .bankDrawerBrand strong {

        display: block;

        color: #111827;

        font-size: 16px;
    }


    .bankDrawerBrand small {

        display: block;

        margin-top: 4px;

        color: #94a3b8;

        font-size: 11px;
    }


    /* =========================================================
        CLOSE BUTTON
    ========================================================= */

    #bankDrawerClose {

        width: 38px;
        height: 38px;

        border: none;

        border-radius: 50%;

        background: #f1f5f9;

        color: #64748b;

        font-size: 25px;

        line-height: 1;

        cursor: pointer;

        transition: .25s ease;
    }


    #bankDrawerClose:hover {

        background: #e2e8f0;

        transform: rotate(90deg);
    }


    .bankDrawerLine {

        width: 100%;
        height: 1px;

        background: #e5e7eb;

        margin:
            22px 0 14px;
    }


    /* =========================================================
        DRAWER MENU
    ========================================================= */

    .bankDrawerNav {

        display: flex;

        flex-direction: column;

        gap: 5px;
    }


    .bankDrawerItem {

        width: 100%;

        min-height: 58px;

        display: flex;

        align-items: center;

        box-sizing: border-box;

        gap: 12px;

        padding: 8px 10px;

        border-radius: 14px;

        text-decoration: none;

        color: #334155;

        transition:
            background .2s ease,
            transform .2s ease,
            color .2s ease;
    }


    .bankDrawerItem:hover {

        background: #f5f3ff;

        color: #6366f1;

        transform:
            translateX(3px);
    }


    .bankDrawerItem.bank-current {

        background:
            linear-gradient(
                135deg,
                #eef2ff,
                #f5f3ff
            );

        color: #6366f1;
    }


    .bankDrawerIcon {

        width: 40px;
        height: 40px;

        flex-shrink: 0;

        display: flex;

        align-items: center;
        justify-content: center;

        border-radius: 11px;

        background: #f8fafc;

        font-size: 18px;
    }


    .bankDrawerText {

        flex: 1;

        font-size: 14px;

        font-weight: 600;
    }


    .bankDrawerArrow {

        font-size: 22px;

        color: #cbd5e1;
    }


    /* =========================================================
        DRAWER FOOTER
    ========================================================= */

    .bankDrawerFooter {

        margin-top: auto;

        display: flex;

        align-items: center;

        gap: 9px;

        padding: 12px;

        border-radius: 12px;

        background: #f8fafc;

        color: #64748b;

        font-size: 12px;
    }


    .bankOnlineDot {

        width: 8px;
        height: 8px;

        border-radius: 50%;

        background: #22c55e;

        box-shadow:
            0 0 0 4px
            rgba(34,197,94,.12);
    }


    /* =========================================================
        CONTENT MOBILE
    ========================================================= */

    body.bank-mobile-mode > *:not(#bankTaxiMobileSystem) {

        max-width: 100% !important;

        box-sizing: border-box;
    }


    /* รูปไม่ล้น */

    body.bank-mobile-mode img {

        max-width: 100% !important;

        height: auto;

        object-fit: contain;
    }


    /* Video */

    body.bank-mobile-mode video {

        max-width: 100%;

        height: auto;
    }


    /* iframe */

    body.bank-mobile-mode iframe {

        max-width: 100% !important;
    }


    /* =========================================================
        TEXT
    ========================================================= */

    body.bank-mobile-mode {

        overflow-wrap: break-word;

        word-wrap: break-word;
    }


    body.bank-mobile-mode h1 {

        font-size:
            clamp(26px, 8vw, 38px);

        line-height: 1.2;
    }


    body.bank-mobile-mode h2 {

        font-size:
            clamp(22px, 6vw, 30px);

        line-height: 1.25;
    }


    body.bank-mobile-mode h3 {

        font-size:
            clamp(18px, 5vw, 24px);
    }


    body.bank-mobile-mode p {

        line-height: 1.7;
    }


    /* =========================================================
        FLEX
    ========================================================= */

    body.bank-mobile-mode .row {

        flex-direction: column !important;
    }


    body.bank-mobile-mode .flex-row {

        flex-direction: column !important;
    }


    /* =========================================================
        GRID
    ========================================================= */

    body.bank-mobile-mode .grid {

        grid-template-columns:
            1fr !important;
    }


    body.bank-mobile-mode .cards {

        grid-template-columns:
            1fr !important;
    }


    /* =========================================================
        COMMON CARD
    ========================================================= */

    body.bank-mobile-mode .card {

        width: 100% !important;

        max-width: 100% !important;

        box-sizing: border-box;
    }


    /* =========================================================
        TABLE
    ========================================================= */

    body.bank-mobile-mode table {

        display: block;

        width: 100% !important;

        max-width: 100% !important;

        overflow-x: auto;

        -webkit-overflow-scrolling: touch;

        white-space: nowrap;
    }


    /* =========================================================
        FORMS
    ========================================================= */

    body.bank-mobile-mode input,
    body.bank-mobile-mode textarea,
    body.bank-mobile-mode select {

        max-width: 100%;

        box-sizing: border-box;
    }


    body.bank-mobile-mode button {

        max-width: 100%;

        box-sizing: border-box;
    }


    /* =========================================================
        ปุ่มสลับโหมดพรีเมียม (ดีไซน์สมจริง 3D / ขอบเงาคมชัด)
    ========================================================= */

    #bankMobileSwitch {

        position: fixed;

        left: 20px;

        bottom: 20px;

        width: 54px;
        height: 54px;

        z-index: 12000;

        border: 1px solid rgba(255, 255, 255, 0.35);

        border-radius: 50%;

        display: flex;

        align-items: center;
        justify-content: center;

        cursor: pointer;

        background:
            linear-gradient(
                145deg,
                #667eea,
                #5a67d8
            );

        color: white;

        box-shadow:
            0 8px 20px rgba(102, 126, 234, 0.38),
            inset 0 1px 1px rgba(255, 255, 255, 0.5),
            inset 0 -2px 4px rgba(0, 0, 0, 0.2);

        transition:
            transform .3s cubic-bezier(0.34, 1.56, 0.64, 1),
            box-shadow .3s ease;
    }


    #bankMobileSwitch:hover {

        transform:
            translateY(-4px)
            scale(1.08);

        background:
            linear-gradient(
                145deg,
                #748ffc,
                #667eea
            );

        box-shadow:
            0 14px 28px rgba(102, 126, 234, 0.48),
            inset 0 1px 2px rgba(255, 255, 255, 0.7),
            inset 0 -2px 4px rgba(0, 0, 0, 0.25);
    }


    #bankMobileSwitch:active {

        transform:
            translateY(1px)
            scale(0.94);

        box-shadow:
            0 4px 10px rgba(102, 126, 234, 0.3),
            inset 0 2px 4px rgba(0, 0, 0, 0.25);
    }


    .bankSwitchIcon {

        display: flex;
        align-items: center;
        justify-content: center;

        filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.25));

        transition:
            transform 0.3s ease;
    }


    .bankSwitchStatus {

        position: absolute;

        right: 3px;
        bottom: 3px;

        width: 12px;
        height: 12px;

        border-radius: 50%;

        border: 2px solid #ffffff;

        background: #22c55e;

        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    }


    /* =========================================================
        MOBILE SCREEN
    ========================================================= */

    @media (max-width: 768px) {

        body.bank-mobile-mode #bankMobileHeader {

            height: 60px;
        }


        #bankMobileSwitch {

            width: 50px;
            height: 50px;

            left: 15px;
            bottom: 15px;
        }


        #bankMobileDrawer {

            width: 290px;

            max-width: 82vw;
        }
    }


    /* =========================================================
        DESKTOP
    ========================================================= */

    @media (min-width: 769px) {

        #bankMobileHeader,
        #bankMobileDrawer,
        #bankTaxiMobileSystem {
            display: block;
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
            padding-top: 64px;
        }
    }

    `;

    document.head.appendChild(style);


    // =========================================================
    // ELEMENTS
    // =========================================================

    const menuButton =
        document.getElementById(
            "bankMobileMenuButton"
        );

    const drawer =
        document.getElementById(
            "bankMobileDrawer"
        );

    const overlay =
        document.getElementById(
            "bankMobileOverlay"
        );

    const closeButton =
        document.getElementById(
            "bankDrawerClose"
        );

    const switchButton =
        document.getElementById(
            "bankMobileSwitch"
        );


    // =========================================================
    // OPEN DRAWER
    // =========================================================

    function openDrawer() {

        drawer.classList.add("bank-open");

        overlay.classList.add("bank-open");

        document.body.classList.add(
            "bank-drawer-open"
        );
    }


    // =========================================================
    // CLOSE DRAWER
    // =========================================================

    function closeDrawer() {

        drawer.classList.remove("bank-open");

        overlay.classList.remove("bank-open");

        document.body.classList.remove(
            "bank-drawer-open"
        );
    }


    menuButton.addEventListener(
        "click",
        openDrawer
    );


    closeButton.addEventListener(
        "click",
        closeDrawer
    );


    overlay.addEventListener(
        "click",
        closeDrawer
    );


    // =========================================================
    // ESC
    // =========================================================

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                closeDrawer();
            }

        }
    );


    // =========================================================
    // ACTIVE MENU
    // =========================================================

    document
        .querySelectorAll(".bankDrawerItem")
        .forEach(link => {

            const href =
                link
                    .getAttribute("href")
                    .toLowerCase();

            if (
                href === currentFile ||
                (
                    currentFile === "" &&
                    href === "index.html"
                )
            ) {

                link.classList.add(
                    "bank-current"
                );
            }


            link.addEventListener(
                "click",
                () => {

                    closeDrawer();
                }
            );

        });


    // =========================================================
    // APPLY MOBILE MODE
    // =========================================================

    function applyMobileMode(enabled) {

        const iconContainer =
            switchButton.querySelector(
                ".bankSwitchIcon"
            );

        const status =
            switchButton.querySelector(
                ".bankSwitchStatus"
            );


        if (enabled) {

            document.body.classList.add(
                "bank-mobile-mode"
            );


            iconContainer.innerHTML = svgDesktop;

            status.style.background =
                "#f59e0b";


            switchButton.title =
                isEnglish
                    ? "Switch to Desktop"
                    : "กลับโหมดเดสก์ท็อป";


        } else {

            document.body.classList.remove(
                "bank-mobile-mode"
            );


            iconContainer.innerHTML = svgMobile;

            status.style.background =
                "#22c55e";


            switchButton.title =
                isEnglish
                    ? "Switch to Mobile"
                    : "สลับโหมดมือถือ";


            closeDrawer();
        }
    }


    // =========================================================
    // LOAD MODE
    // =========================================================

    const savedMode =
        localStorage.getItem(
            STORAGE_KEY
        ) === "true";


    applyMobileMode(savedMode);


    // =========================================================
    // SWITCH BUTTON
    // =========================================================

    switchButton.addEventListener(
        "click",
        () => {

            const current =
                document.body.classList.contains(
                    "bank-mobile-mode"
                );

            const next = !current;


            localStorage.setItem(
                STORAGE_KEY,
                String(next)
            );


            const iconContainer =
                switchButton.querySelector(
                    ".bankSwitchIcon"
                );


            iconContainer.style.transform =
                "rotate(180deg) scale(0.7)";


            setTimeout(() => {

                applyMobileMode(next);

                iconContainer.style.transform =
                    "rotate(0deg) scale(1)";

            }, 160);

        }
    );

});