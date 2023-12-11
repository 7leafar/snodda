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
    if (localStorage.getItem('leafar_SAFEATTACK.x') && localStorage.getItem('leafar_SAFEATTACK.y')) {
        ADDON_Main.style.left = localStorage.getItem('leafar_SAFEATTACK.x');
        ADDON_Main.style.top = localStorage.getItem('leafar_SAFEATTACK.y');
    }

    const ADDON_Top = document.createElement('div');
    ADDON_Top.classList.add("leafar_addon-settings-top");
    ADDON_Top.textContent = '[leafar] Safe Attack';

    const ADDON_Col = document.createElement('div');
    ADDON_Col.classList.add("leafar_main-column");

    const ADDON_Close = document.createElement('div');
    ADDON_Close.classList.add("leafar_addon-settings-close");
    ADDON_Close.textContent = 'X';

    const SA_EnabledText = document.createElement('span');
    SA_EnabledText.textContent = 'Włącz: ';
    SA_EnabledText.classList.add("leafar_addon-text");

    const SA_EnabledCheck = document.createElement('input');
    SA_EnabledCheck.type = 'checkbox';
    SA_EnabledCheck.style.cursor = 'url(https://nubes.margonem.pl/img/gui/cursor/5.png?v=1691053381869), auto';
    if (localStorage.getItem('leafar_SAFEATTACK.enabledCheck') === 'ON') {
        SA_EnabledCheck.checked = true;
    }
    else {
        SA_EnabledCheck.checked = false;
    }

    const SA_KeyText = document.createElement('span');
    SA_KeyText.textContent = 'Atakuj na: ';
    SA_KeyText.classList.add("leafar_addon-text");

    const SA_KeyBind = document.createElement('input');
    SA_KeyBind.type = 'text';
    SA_KeyBind.style.width = '15px';
    SA_KeyBind.style.height = '15px';
    if (localStorage.getItem('leafar_SAFEATTACK.key') !== null) {
        SA_KeyBind.value = localStorage.getItem('leafar_SAFEATTACK.key');
    }
    else {
        SA_KeyBind.value = 'x';
    }
    SA_KeyBind.maxLength = '1';

    const SA_MessageText = document.createElement('span');
    SA_MessageText.textContent = 'Wyświetlaj komunikaty: ';
    SA_MessageText.classList.add("leafar_addon-text");

    const SA_MessageCheck = document.createElement('input');
    SA_MessageCheck.type = 'checkbox';
    SA_MessageCheck.style.cursor = 'url(https://nubes.margonem.pl/img/gui/cursor/5.png?v=1691053381869), auto';
    if (localStorage.getItem('leafar_SAFEATTACK.messageCheck') === 'ON') {
        SA_MessageCheck.checked = true;
    }
    else {
        SA_MessageCheck.checked = false;
    }

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
        ADDON_Col.append(SA_EnabledText, SA_KeyText, SA_MessageText, SettingsChangedText, SaveSettingsButton);
        SA_EnabledText.appendChild(SA_EnabledCheck);
        SA_KeyText.appendChild(SA_KeyBind);
        SA_MessageText.appendChild(SA_MessageCheck);
        localStorage.setItem('leafar_SAFEATTACK.show', 'visible');
    }
    if (localStorage.getItem('leafar_SAFEATTACK.show') === 'visible') {
        SubAddon_Constructor();
    }

    function SubAddon_OpenWindow() {
        if (localStorage.getItem('leafar_SAFEATTACK.show') === 'visible') {
            SubAddon_CloseWindow();
        }
        else {
            SubAddon_Constructor();
        }
    }
    leafarGlobals.SA_SettingsButton.addEventListener('click', SubAddon_OpenWindow);

    function SubAddon_CloseWindow() {
        localStorage.setItem('leafar_SAFEATTACK.show', 'hidden');
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
            localStorage.setItem('leafar_SAFEATTACK.x', ADDON_Main.style.left);
            localStorage.setItem('leafar_SAFEATTACK.y', ADDON_Main.style.top);
        }
        document.addEventListener('mousemove', moveBox);
        document.addEventListener('mouseup', stopDrag);
    }
    ADDON_Top.addEventListener('mousedown', handleDrag);

    let leafarVisible = localStorage.getItem('leafar_SAFEATTACK.visible');
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
            localStorage.setItem('leafar_SAFEATTACK.visible', leafarVisible);
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
        if (SA_EnabledCheck.checked) {
            localStorage.setItem('leafar_SAFEATTACK.enabledCheck', 'ON');
        }
        else {
            localStorage.setItem('leafar_SAFEATTACK.enabledCheck', 'OFF');
        }
        //Save Keybind
        if (SA_KeyBind.value.length === 0) {
            SA_KeyBind.value = localStorage.getItem('leafar_SAFEATTACK.key')
        }
        else{
            SAFEATTACKKey = SA_KeyBind.value;
            localStorage.setItem('leafar_SAFEATTACK.key', SAFEATTACKKey);
        }
        //Save Message
        if (SA_MessageCheck.checked) {
            localStorage.setItem('leafar_SAFEATTACK.messageCheck', 'ON');
        }
        else {
            localStorage.setItem('leafar_SAFEATTACK.messageCheck', 'OFF');
        }
        SettingsChangedText.textContent = '-';
        this.blur();
    });
    
    //Edit settings
    SA_EnabledCheck.addEventListener('change', function() {
        SettingsChangedText.textContent = 'Zapisz ustawienia';
        this.blur();
    });

    SA_MessageCheck.addEventListener('change', function() {
        SettingsChangedText.textContent = 'Zapisz ustawienia';
        this.blur();
    });

    SA_KeyBind.addEventListener('click', function() {
        changingSettings = true;
    });

    SA_KeyBind.addEventListener('blur', function() {
        setTimeout(function() {
            changingSettings = false;
        }, 100);
    });
    
    let SAFEATTACKKey = SA_KeyBind.value;
    SA_KeyBind.addEventListener('input', function() {
        if (SA_KeyBind.value.length === 0) {
            SA_KeyBind.placeholder = SAFEATTACKKey;
            return;
        }
        else {
            SettingsChangedText.textContent = 'Zapisz ustawienia';
            setTimeout(function() {
                SA_KeyBind.blur();
            }, 100);
        }
    });
    //----------------------
    //END OF WINDOW SETTINGS
    //----------------------

    //--------------
    //SUB-ADDON CODE
    //--------------
    document.addEventListener("keyup", ev => {
        if (!changingSettings) {
            if (ev.key === SAFEATTACKKey && !["INPUT", "TEXTAREA", "MAGIC_INPUT"].includes(ev.target.tagName)) {
                    if (localStorage.getItem('leafar_SAFEATTACK.enabledCheck') == 'ON') {
                        const attackedPlayers = [];
                        if (leafarGlobals.leafarInterfaceNI) {
                            Engine.others.getDrawableList().forEach((playerData) => {
                                if (playerData instanceof Object && typeof playerData === 'object') {
                                    let playerDistance = Math.abs(Engine.hero.d.x - playerData.d.x) + Math.abs(Engine.hero.d.y - playerData.d.y);
                                    if (playerDistance < 4) {
                                        if (Array.isArray(Engine.others.getById(playerData.d.id).onSelfEmoList) && Engine.others.getById(playerData.d.id).onSelfEmoList.length > 0) {
                                            Object.values(Engine.others.getById(playerData.d.id).onSelfEmoList).forEach((emotion) => {
                                                if (emotion.name !== 'battle' && emotion.name !== 'pvpprotected') {
                                                    if (playerData.d.relation === 1 || playerData.d.relation === 3 || playerData.d.relation === 6) {
                                                        if (playerData.d.hasOwnProperty('id')) {
                                                            attackedPlayers.push({
                                                                playerNick: playerData.d.nick,
                                                                playerID: playerData.d.id,
                                                            });
                                                        }
                                                    }
                                                }
                                            });
                                        }
                                        else {
    
                                            if (playerData.d.relation === 1 || playerData.d.relation === 3 || playerData.d.relation === 6) {
                                                if (playerData.d.hasOwnProperty('id')) {
                                                    attackedPlayers.push({
                                                        playerNick: playerData.d.nick,
                                                        playerID: playerData.d.id,
                                                    });
                                                }
                                            }
                                        }
                                    }
                                }
                            });
    
                        }
                        else {
                            Object.values(g.other).forEach((playerData) => {
                                if (playerData instanceof Object && typeof playerData === 'object') {
                                    let isFightingID = playerData.id;
                                    let isFightingEmoBattle = 'battle';
                                    let isFightingEmoProtected = 'pvpprotected';
                                    let isFightingBattle = !!$(`#other${isFightingID}`).find(`.emo-${isFightingEmoBattle}`).length;
                                    let isFightingProtected = !!$(`#other${isFightingID}`).find(`.emo-${isFightingEmoProtected}`).length;
                                    if (isFightingBattle === false && isFightingProtected === false) {
                                        let playerDistance = Math.abs(hero.x - playerData.x) + Math.abs(hero.y - playerData.y);
                                        if (playerDistance < 4) {
                                            if (playerData.relation === 1 || playerData.relation === 3 || playerData.relation === 6) {
                                                if (playerData.hasOwnProperty('id') && playerData.hasOwnProperty('x') && playerData.hasOwnProperty('y')) {
                                                    attackedPlayers.push({
                                                        playerNick: playerData.nick,
                                                        playerID: playerData.id,
                                                    });
                                                }
                                            }
                                        }
                                    }
        
                                }
                            });
                        }
        
                        if (attackedPlayers.length === 0) {
                            if (localStorage.getItem('leafar_SAFEATTACK.messageCheck') == 'ON') {
                                message("Nie wykryto wrogich graczy.");
                            }
                        }
                        else {
                            if (localStorage.getItem('leafar_SAFEATTACK.messageCheck') == 'ON') {
                                message('Atakowanie wrogów w pobliżu.');
                            }
                            for (let i = 0; i < attackedPlayers.length; i++) {
                                _g(`fight&a=attack&id=${attackedPlayers[i].playerID}`);
                            }
                        }
                    }
                }
        }
    });
    //---------------------
    //END OF SUB-ADDON CODE
    //---------------------
})();