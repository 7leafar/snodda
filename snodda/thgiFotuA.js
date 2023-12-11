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
    if (localStorage.getItem('leafar_AUTOFIGHT.x') && localStorage.getItem('leafar_AUTOFIGHT.y')) {
        ADDON_Main.style.left = localStorage.getItem('leafar_AUTOFIGHT.x');
        ADDON_Main.style.top = localStorage.getItem('leafar_AUTOFIGHT.y');
    }

    const ADDON_Top = document.createElement('div');
    ADDON_Top.classList.add("leafar_addon-settings-top");
    ADDON_Top.textContent = '[leafar] Auto Fight';

    const ADDON_Col = document.createElement('div');
    ADDON_Col.classList.add("leafar_main-column");

    const ADDON_Close = document.createElement('div');
    ADDON_Close.classList.add("leafar_addon-settings-close");
    ADDON_Close.textContent = 'X';

    const AF_EnabledText = document.createElement('span');
    AF_EnabledText.textContent = 'Włącz: ';
    AF_EnabledText.classList.add("leafar_addon-text");

    const AF_EnabledCheck = document.createElement('input');
    AF_EnabledCheck.type = 'checkbox';
    AF_EnabledCheck.style.cursor = 'url(https://nubes.margonem.pl/img/gui/cursor/5.png?v=1691053381869), auto';
    if (localStorage.getItem('leafar_AUTOFIGHT.enabledCheck') === 'ON') {
        AF_EnabledCheck.checked = true;
    }
    else {
        AF_EnabledCheck.checked = false;
    }

    const AF_SpecialMobsText = document.createElement('span');
    AF_SpecialMobsText.textContent = 'AutoFight Kolos/Tytan/E3: ';
    AF_SpecialMobsText.classList.add("leafar_addon-text");

    const AF_SpecialMobsCheck = document.createElement('input');
    AF_SpecialMobsCheck.type = 'checkbox';
    AF_SpecialMobsCheck.style.cursor = 'url(https://nubes.margonem.pl/img/gui/cursor/5.png?v=1691053381869), auto';
    if (localStorage.getItem('leafar_AUTOFIGHT.specialMobsCheck') === 'ON') {
        AF_SpecialMobsCheck.checked = true;
    }
    else {
        AF_SpecialMobsCheck.checked = false;
    }

    const AF_PvpText = document.createElement('span');
    AF_PvpText.textContent = 'AutoFight w PvP: ';
    AF_PvpText.classList.add("leafar_addon-text");

    const AF_PvpCheck = document.createElement('input');
    AF_PvpCheck.type = 'checkbox';
    AF_PvpCheck.style.cursor = 'url(https://nubes.margonem.pl/img/gui/cursor/5.png?v=1691053381869), auto';
    if (localStorage.getItem('leafar_AUTOFIGHT.pvpCheck') === 'ON') {
        AF_PvpCheck.checked = true;
    }
    else {
        AF_PvpCheck.checked = false;
    }

    const AF_GroupAdvantageText = document.createElement('span');
    AF_GroupAdvantageText.textContent = 'F z przewagą osób (PvP): ';
    AF_GroupAdvantageText.classList.add("leafar_addon-text");

    const AF_GroupAdvantage = document.createElement('input');
    AF_GroupAdvantage.type = 'text';
    AF_GroupAdvantage.style.width = '30px';
    AF_GroupAdvantage.style.height = '15px';
    if (localStorage.getItem('leafar_AUTOFIGHT.groupAdvantage') !== null) {
        AF_GroupAdvantage.value = localStorage.getItem('leafar_AUTOFIGHT.groupAdvantage');
    }
    else {
        AF_GroupAdvantage.value = '';
    }
    AF_GroupAdvantage.maxLength = '1';

    const SettingsChangedText = document.createElement('span');
    SettingsChangedText.classList.add("leafar_alert-text");
    SettingsChangedText.textContent = '-';

    const SaveSettingsButton = document.createElement('input');
    SaveSettingsButton.classList.add("leafar_addon-button");
    SaveSettingsButton.type = 'button';
    SaveSettingsButton.value = 'Zapisz';
    //--------------------
    //END OF HTML ELEMENTS
    //--------------------

    //-----------------
    //SUB-ADDON WINDOW
    //-----------------
    function SubAddon_Constructor() {
        document.body.appendChild(ADDON_Main);
        ADDON_Main.append(ADDON_Top, ADDON_Col, ADDON_Close);
        ADDON_Col.append(AF_EnabledText, AF_SpecialMobsText, AF_PvpText, AF_GroupAdvantageText, SettingsChangedText, SaveSettingsButton);
        AF_EnabledText.appendChild(AF_EnabledCheck);
        AF_SpecialMobsText.appendChild(AF_SpecialMobsCheck);
        AF_PvpText.appendChild(AF_PvpCheck);
        AF_GroupAdvantageText.appendChild(AF_GroupAdvantage);
        localStorage.setItem('leafar_AUTOFIGHT.show', 'visible');
    }
    if (localStorage.getItem('leafar_AUTOFIGHT.show') === 'visible') {
        SubAddon_Constructor();
    }

    function SubAddon_OpenWindow() {
        if (localStorage.getItem('leafar_AUTOFIGHT.show') === 'visible') {
            SubAddon_CloseWindow();
        }
        else {
            SubAddon_Constructor();
        }
    }
    leafarGlobals.AF_SettingsButton.addEventListener('click', SubAddon_OpenWindow);

    function SubAddon_CloseWindow() {
        localStorage.setItem('leafar_AUTOFIGHT.show', 'hidden');
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
            localStorage.setItem('leafar_AUTOFIGHT.x', ADDON_Main.style.left);
            localStorage.setItem('leafar_AUTOFIGHT.y', ADDON_Main.style.top);
        }
        document.addEventListener('mousemove', moveBox);
        document.addEventListener('mouseup', stopDrag);
    }
    ADDON_Top.addEventListener('mousedown', handleDrag);

    let leafarVisible = localStorage.getItem('leafar_AUTOFIGHT.visible');
    if (leafarVisible === 'visible') {
        ADDON_Col.style.display = 'flex';
        ADDON_Top.style.border = '0px solid silver';
        ADDON_Top.style.width = '190px';
        ADDON_Main.style.border = '1px solid silver';
        ADDON_Main.style.width = '200px';
    }
    else {
        ADDON_Col.style.display = 'none';
        ADDON_Top.style.border = '1px solid silver';
        ADDON_Top.style.width = '140px';
        ADDON_Main.style.border = '0px solid silver';
        ADDON_Main.style.width = '150px';
    }

    function SubAddon_ToggleVisibility() {
        if (!hasMoved) {
            if (leafarVisible === 'visible') {
                ADDON_Col.style.display = 'none';
                ADDON_Top.style.border = '1px solid silver';
                ADDON_Top.style.width = '140px';
                ADDON_Main.style.border = '0px solid silver';
                ADDON_Main.style.width = '150px';
                leafarVisible = 'hidden';
            }
            else {
                ADDON_Col.style.display = 'flex';
                ADDON_Top.style.border = '0px solid silver';
                ADDON_Top.style.width = '190px';
                ADDON_Main.style.border = '1px solid silver';
                ADDON_Main.style.width = '200px';
                leafarVisible = 'visible';
            }
            localStorage.setItem('leafar_AUTOFIGHT.visible', leafarVisible);
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
    //Save settings
    SaveSettingsButton.addEventListener('click', function() {
        //Save Enabled
        if (AF_EnabledCheck.checked) {
            localStorage.setItem('leafar_AUTOFIGHT.enabledCheck', 'ON');
        }
        else {
            localStorage.setItem('leafar_AUTOFIGHT.enabledCheck', 'OFF');
        }
        //Save Special Mobs
        if (AF_SpecialMobsCheck.checked) {
            localStorage.setItem('leafar_AUTOFIGHT.specialMobsCheck', 'ON');
        }
        else {
            localStorage.setItem('leafar_AUTOFIGHT.specialMobsCheck', 'OFF');
        }
        //Save Pvp
        if (AF_PvpCheck.checked) {
            localStorage.setItem('leafar_AUTOFIGHT.pvpCheck', 'ON');
        }
        else {
            localStorage.setItem('leafar_AUTOFIGHT.pvpCheck', 'OFF');
        }
        //Save Group Advantage
        try {
            if (AF_GroupAdvantage.value.length === 0) {
                AF_GroupAdvantage.value = localStorage.getItem('leafar_AUTOFIGHT.groupAdvantage');
            }
            else if (parseInt(AF_GroupAdvantage.value) > 9) {
                AF_GroupAdvantage.value = 9;
            }
            else if (parseInt(AF_GroupAdvantage.value) < 0) {
                AF_GroupAdvantage.value = 0;
            }
            localStorage.setItem('leafar_AUTOFIGHT.groupAdvantage', AF_GroupAdvantage.value);
        }
        catch {
            AF_GroupAdvantage.value = localStorage.getItem('leafar_AUTOFIGHT.groupAdvantage');
        }
        SettingsChangedText.textContent = '-';
        this.blur();
    });
    
    //Edit settings
    AF_EnabledCheck.addEventListener('change', function() {
        SettingsChangedText.textContent = 'Zapisz ustawienia';
        this.blur();
    });

    AF_SpecialMobsCheck.addEventListener('change', function() {
        SettingsChangedText.textContent = 'Zapisz ustawienia';
        this.blur();
    });

    AF_PvpCheck.addEventListener('change', function() {
        SettingsChangedText.textContent = 'Zapisz ustawienia';
        this.blur();
    });
    //----------------------
    //END OF WINDOW SETTINGS
    //----------------------

    //--------------
    //SUB-ADDON CODE
    //--------------
    function AUTOFIGHTFunction() {
        if (AF_EnabledCheck.checked) {
            setTimeout(() => {
                let AUTOFIGHTAdvantageVal = localStorage.getItem('leafar_AUTOFIGHT.groupAdvantage');
                let AUTOFIGHTAllowFight = true;
                let AUTOFIGHTEnemyWt;
                let AUTOFIGHTBothTeams;
                let AUTOFIGHTTeamOne;
                let AUTOFIGHTTeamTwo;
                try {
                    if (leafarGlobals.leafarInterfaceNI) {
                        AUTOFIGHTEnemyWt = Object.values(Engine.battle.warriorsList).find(it => it.id < 0).wt;
                    }
                    else {
                        AUTOFIGHTEnemyWt = Object.values(g.battle.f).find(it => it.id < 0).wt;
                    }
                }
                catch {
                    if (Engine.battle.canLeaveBattle === true) {
                        return;
                    }
                }
                if (localStorage.getItem('leafar_AUTOFIGHT.specialMobsCheck') === 'OFF') {
                    if ((AUTOFIGHTEnemyWt >= 30 && AUTOFIGHTEnemyWt < 40) || AUTOFIGHTEnemyWt >= 100) {
                        AUTOFIGHTAllowFight = false;
                    }
                }

                if (localStorage.getItem('leafar_AUTOFIGHT.pvpCheck') === 'OFF') {
                    if (AUTOFIGHTEnemyWt === undefined) {
                        AUTOFIGHTAllowFight = false;
                    }
                }
                else {
                    if (leafarGlobals.leafarInterfaceNI) {
                        AUTOFIGHTBothTeams = Engine.battle.getTeamIDs();
                    }
                    else {
                        Object.values(g.battle.f).forEach((fighterData) => {
                            if (fighterData instanceof Object && typeof fighterData === 'object') {
                                if (fighterData.team === 1) {
                                    AUTOFIGHTTeamOne++;
                                }
                                else {
                                    AUTOFIGHTTeamOne++;
                                }
                            }
                        });
                    }
                    if (((AUTOFIGHTBothTeams[1].length - AUTOFIGHTBothTeams[2].length) < AUTOFIGHTAdvantageVal) || ((AUTOFIGHTTeamOne - AUTOFIGHTTeamTwo) < AUTOFIGHTAdvantageVal)) {
                        AUTOFIGHTAllowFight = false;
                    }
                }
                if (AUTOFIGHTAllowFight) {
                    _g('fight&a=f');
                }
            }, 150);
        }
    }

    if (leafarGlobals.leafarInterfaceNI) {
        API.addCallbackToEvent("open_battle_window", AUTOFIGHTFunction);
    }
    else {
        webSocket.addEventListener("message", (event) => {
            const message = JSON.parse(event.data);
            if (message.f && message.f.init === "1") {
                AUTOFIGHTFunction();
            }
        });
    }
    //---------------------
    //END OF SUB-ADDON CODE
    //---------------------
})();