(function() {
    $(document).ready(function() {
        $("head").append(`<link rel="stylesheet" type="text/css" href="https://7leafar.github.io/main/lenap.css?v=${Math.random()}">`);
    });
    let changingSettings = false;

    //-------------
    //HTML ELEMENTS
    //-------------
    const ADDON_Main = document.createElement('div');
    ADDON_Main.classList.add("leafar_addon-settings-main-body");
    if (localStorage.getItem('leafar_LOOTLOGS.x') && localStorage.getItem('leafar_LOOTLOGS.y')) {
        ADDON_Main.style.left = localStorage.getItem('leafar_LOOTLOGS.x');
        ADDON_Main.style.top = localStorage.getItem('leafar_LOOTLOGS.y');
    }

    const ADDON_Top = document.createElement('div');
    ADDON_Top.classList.add("leafar_addon-settings-top");
    ADDON_Top.textContent = '[leafar] Loot Logs';

    const ADDON_Col = document.createElement('div');
    ADDON_Col.classList.add("leafar_main-column");

    const ADDON_Close = document.createElement('div');
    ADDON_Close.classList.add("leafar_addon-settings-close");
    ADDON_Close.textContent = 'X';

    const LL_EnabledText = document.createElement('span');
    LL_EnabledText.classList.add("leafar_addon-text");
    //--------------------
    //END OF HTML ELEMENTS
    //--------------------

    //-----------------
    //SUB-ADDON WINDOW
    //-----------------
    function SubAddon_Constructor() {
        document.body.appendChild(ADDON_Main);
        ADDON_Main.append(ADDON_Top, ADDON_Col, ADDON_Close);
        ADDON_Col.append(LL_EnabledText);
        //LL_EnabledText.appendChild(IE_EnabledCheck);
        localStorage.setItem('leafar_LOOTLOGS.show', 'visible');
    }
    if (localStorage.getItem('leafar_LOOTLOGS.show') === 'visible') {
        SubAddon_Constructor();
    }

    function SubAddon_OpenWindow() {
        if (localStorage.getItem('leafar_LOOTLOGS.show') === 'visible') {
            SubAddon_CloseWindow();
        }
        else {
            SubAddon_Constructor();
        }
    }
    leafarGlobals.LL_SettingsButton.addEventListener('click', SubAddon_OpenWindow);

    function SubAddon_CloseWindow() {
        localStorage.setItem('leafar_LOOTLOGS.show', 'hidden');
        leafarRemoveAllChildren(ADDON_Main);
    }
    ADDON_Close.addEventListener('click', SubAddon_CloseWindow);
    //-----------------------
    //END OF SUB-ADDON WINDOW
    //-----------------------

    //-----------
    //WINDOW CODE
    //-----------
    let hasMoved = false;
    let baseWidth = 250;
    function handleDrag(event) {
        event.preventDefault();
        let initialX = event.clientX;
        let initialY = event.clientY;
        function moveBox(event) {
            let deltaX = event.clientX - initialX;
            let deltaY = event.clientY - initialY;
            ADDON_Main.style.left = `${ADDON_Main.offsetLeft + deltaX}px`;
            ADDON_Main.style.top = `${ADDON_Main.offsetTop + deltaY}px`;
            if (initialX !== event.clientX || initialY !== event.clientY) {
                hasMoved = true;
            }
            initialX = event.clientX;
            initialY = event.clientY;
        }
        function stopDrag() {
            document.removeEventListener('mousemove', moveBox);
            document.removeEventListener('mouseup', stopDrag);
            localStorage.setItem('leafar_LOOTLOGS.x', ADDON_Main.style.left);
            localStorage.setItem('leafar_LOOTLOGS.y', ADDON_Main.style.top);
        }
        document.addEventListener('mousemove', moveBox);
        document.addEventListener('mouseup', stopDrag);
    }
    ADDON_Top.addEventListener('mousedown', handleDrag);

    let leafarVisible = localStorage.getItem('leafar_LOOTLOGS.visible');
    let leafarTempVisible = false;
    if (leafarVisible !== 'visible') {
        leafarTempVisible = true;
        leafarVisible = 'visible';
    }

    if (leafarVisible === 'visible') {
        ADDON_Col.style.display = 'flex';
        ADDON_Top.style.border = '0px solid silver';
        ADDON_Top.style.width = (baseWidth - 10) + 'px';
        ADDON_Main.style.border = '1px solid silver';
        ADDON_Main.style.width = baseWidth + 'px';
    }
    else {
        ADDON_Col.style.display = 'none';
        ADDON_Top.style.border = '1px solid silver';
        ADDON_Top.style.width = '150px';
        ADDON_Main.style.border = '0px solid silver';
        ADDON_Main.style.width = '160px';
    }

    function SubAddon_ToggleVisibility() {
        if (!hasMoved) {
            if (leafarVisible === 'visible') {
                ADDON_Col.style.display = 'none';
                ADDON_Top.style.border = '1px solid silver';
                ADDON_Top.style.width = '150px';
                ADDON_Main.style.border = '0px solid silver';
                ADDON_Main.style.width = '160px';
                leafarVisible = 'hidden';
            }
            else {
                ADDON_Col.style.display = 'flex';
                ADDON_Top.style.border = '0px solid silver';
                ADDON_Top.style.width = (baseWidth - 10) + 'px';
                ADDON_Main.style.border = '1px solid silver';
                ADDON_Main.style.width = baseWidth + 'px';
                leafarVisible = 'visible';
            }
            localStorage.setItem('leafar_LOOTLOGS.visible', leafarVisible);
        }
        else {
            hasMoved = false;
        }
    }
    ADDON_Top.addEventListener('click', SubAddon_ToggleVisibility);

    //------------------
    //END OF WINDOW CODE
    //------------------

    //---------------
    //WINDOW SETTINGS
    //---------------

    //----------------------
    //END OF WINDOW SETTINGS
    //----------------------

    //--------------
    //SUB-ADDON CODE
    //--------------
    let timers = document.getElementsByClassName("cll-timers");
    let allTimers= []
    if (timers.length) {

        Object.assign(LL_EnabledText.style, {
            "width": "100%",
            "overflow": "auto",
            "height": "200px",
            "overflow": "hidden",
            "border": "1px solid #ccc",
            "scroll-behavior": "smooth"

        });

        LL_EnabledText.addEventListener("wheel", function (e) {
            if (e.deltaY !== 0) {
                this.scrollTop += e.deltaY;
                e.preventDefault();
            }
        });
        for(let i = 0; i < timers.length; i++) {
            $(timers[i]).trigger("mouseenter");
            $(timers[i]).draggable("disable");
            Object.assign(timers[i].style, {
                "position": "static",
                "margin-left": "auto",
                "margin-right": "auto"
            });
            let css = timers[i].getAttribute("style");
            timers[i].setAttribute("style", css.replace("static;", "static !important;"));

            allTimers.push(timers[i]);
        }
    }

    allTimers.forEach(element => {
        const changeLootlogs = document.createElement('button');
        changeLootlogs.style.width = "120px";
        changeLootlogs.style.height = "22px";
        changeLootlogs.style.cursor = "url(https://nubes.margonem.pl/img/gui/cursor/5.png?v=1691053381869), auto";
        changeLootlogs.style.marginTop = "2px";
        changeLootlogs.style.marginBottom = "2px";
        changeLootlogs.textContent = element.getAttribute("id").split("cll-timers-")[1].replace(/_/g, " ");;
        ADDON_Col.appendChild(changeLootlogs);
        changeLootlogs.addEventListener('click', function() {
            while (LL_EnabledText.firstChild) {
                LL_EnabledText.removeChild(LL_EnabledText.firstChild);
            }
            displayTimers(element);
        });
    });

    function displayTimers(element) {
        LL_EnabledText.appendChild(element);
        baseWidth = element.offsetWidth + 3;
        if (baseWidth < 150) {
            baseWidth = 150;
        }
        ADDON_Top.style.width = (baseWidth - 10) + 'px';
        ADDON_Main.style.width = baseWidth + 'px';
        ADDON_Col.style.width = baseWidth + 'px';
        localStorage.setItem('leafar_LOOTLOGS.activeLootlogId', element.id);
    }
    
    try {
        displayTimers(document.getElementById(localStorage.getItem('leafar_LOOTLOGS.activeLootlogId')));
    }
    catch {
        displayTimers(allTimers[0]);
    }

    if (leafarTempVisible) {
        SubAddon_ToggleVisibility();
    }

    //---------------------
    //END OF SUB-ADDON CODE
    //---------------------
})();