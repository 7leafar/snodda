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
    if (localStorage.getItem('leafar_EASYGROUP.x') && localStorage.getItem('leafar_EASYGROUP.y')) {
        ADDON_Main.style.left = localStorage.getItem('leafar_EASYGROUP.x');
        ADDON_Main.style.top = localStorage.getItem('leafar_EASYGROUP.y');
    }

    const ADDON_Top = document.createElement('div');
    ADDON_Top.classList.add("leafar_addon-settings-top");
    ADDON_Top.textContent = '[leafar] Easy Group';

    const ADDON_Col = document.createElement('div');
    ADDON_Col.classList.add("leafar_main-column");

    const ADDON_Close = document.createElement('div');
    ADDON_Close.classList.add("leafar_addon-settings-close");
    ADDON_Close.textContent = 'X';

    const EG_EnabledText = document.createElement('span');
    EG_EnabledText.textContent = 'Włącz: ';
    EG_EnabledText.classList.add("leafar_addon-text");

    const EG_EnabledCheck = document.createElement('input');
    EG_EnabledCheck.type = 'checkbox';
    EG_EnabledCheck.style.cursor = 'url(https://nubes.margonem.pl/img/gui/cursor/5.png?v=1691053381869), auto';
    if (localStorage.getItem('leafar_EASYGROUP.enabledCheck') === 'ON') {
        EG_EnabledCheck.checked = true;
    }
    else {
        EG_EnabledCheck.checked = false;
    }

    const EG_KeyText = document.createElement('span');
    EG_KeyText.textContent = 'Zapraszaj na: ';
    EG_KeyText.classList.add("leafar_addon-text");

    const EG_KeyBind = document.createElement('input');
    EG_KeyBind.type = 'text';
    EG_KeyBind.style.width = '15px';
    EG_KeyBind.style.height = '15px';
    if (localStorage.getItem('leafar_EASYGROUP.key') !== null) {
        EG_KeyBind.value = localStorage.getItem('leafar_EASYGROUP.key');
    }
    else {
        EG_KeyBind.value = 'v';
    }
    EG_KeyBind.maxLength = '1';

    const EG_AcceptText = document.createElement('span');
    EG_AcceptText.textContent = 'Akceptuj zaproszenia (SI): ';
    EG_AcceptText.classList.add("leafar_addon-text");

    const EG_AcceptCheck = document.createElement('input');
    EG_AcceptCheck.type = 'checkbox';
    EG_AcceptCheck.style.cursor = 'url(https://nubes.margonem.pl/img/gui/cursor/5.png?v=1691053381869), auto';
    if (localStorage.getItem('leafar_EASYGROUP.acceptCheck') === 'ON') {
        EG_AcceptCheck.checked = true;
    }
    else {
        EG_AcceptCheck.checked = false;
    }

    const EG_InviteRandomsText = document.createElement('span');
    EG_InviteRandomsText.textContent = 'Dodawaj obcych: ';
    EG_InviteRandomsText.classList.add("leafar_addon-text");

    const EG_InviteRandomsCheck = document.createElement('input');
    EG_InviteRandomsCheck.type = 'checkbox';
    EG_InviteRandomsCheck.style.cursor = 'url(https://nubes.margonem.pl/img/gui/cursor/5.png?v=1691053381869), auto';
    if (localStorage.getItem('leafar_EASYGROUP.inviteRandomsCheck') === 'ON') {
        EG_InviteRandomsCheck.checked = true;
    }
    else {
        EG_InviteRandomsCheck.checked = false;
    }

const EG_InviteEnemiesText = document.createElement('span');
    EG_InviteEnemiesText.textContent = 'Dodawaj wrogów klanu: ';
    EG_InviteEnemiesText.classList.add("leafar_addon-text");

    const EG_InviteEnemiesCheck = document.createElement('input');
    EG_InviteEnemiesCheck.type = 'checkbox';
    EG_InviteEnemiesCheck.style.cursor = 'url(https://nubes.margonem.pl/img/gui/cursor/5.png?v=1691053381869), auto';
    if (localStorage.getItem('leafar_EASYGROUP.inviteEnemiesCheck') === 'ON') {
        EG_InviteEnemiesCheck.checked = true;
    }
    else {
        EG_InviteEnemiesCheck.checked = false;
    }

const EG_MessageText = document.createElement('span');
    EG_MessageText.textContent = 'Wyświetlaj komunikaty: ';
    EG_MessageText.classList.add("leafar_addon-text");

    const EG_MessageCheck = document.createElement('input');
    EG_MessageCheck.type = 'checkbox';
    EG_MessageCheck.style.cursor = 'url(https://nubes.margonem.pl/img/gui/cursor/5.png?v=1691053381869), auto';
    if (localStorage.getItem('leafar_EASYGROUP.messageCheck') === 'ON') {
        EG_MessageCheck.checked = true;
    }
    else {
        EG_MessageCheck.checked = false;
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
        ADDON_Col.append(EG_EnabledText, EG_KeyText, EG_AcceptText, EG_InviteRandomsText, EG_InviteEnemiesText, EG_MessageText, SettingsChangedText, SaveSettingsButton);
        EG_EnabledText.appendChild(EG_EnabledCheck);
        EG_KeyText.appendChild(EG_KeyBind);
        EG_AcceptText.appendChild(EG_AcceptCheck);
        EG_InviteRandomsText.appendChild(EG_InviteRandomsCheck);
        EG_InviteEnemiesText.appendChild(EG_InviteEnemiesCheck);
        EG_MessageText.appendChild(EG_MessageCheck);
        localStorage.setItem('leafar_EASYGROUP.show', 'visible');
    }
    if (localStorage.getItem('leafar_EASYGROUP.show') === 'visible') {
        SubAddon_Constructor();
    }

    function SubAddon_OpenWindow() {
        if (localStorage.getItem('leafar_EASYGROUP.show') === 'visible') {
            SubAddon_CloseWindow();
        }
        else {
            SubAddon_Constructor();
        }
    }
    leafarGlobals.EG_SettingsButton.addEventListener('click', SubAddon_OpenWindow);

    function SubAddon_CloseWindow() {
        localStorage.setItem('leafar_EASYGROUP.show', 'hidden');
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
            localStorage.setItem('leafar_EASYGROUP.x', ADDON_Main.style.left);
            localStorage.setItem('leafar_EASYGROUP.y', ADDON_Main.style.top);
        }
        document.addEventListener('mousemove', moveBox);
        document.addEventListener('mouseup', stopDrag);
    }
    ADDON_Top.addEventListener('mousedown', handleDrag);

    let leafarVisible = localStorage.getItem('leafar_EASYGROUP.visible');
    if (leafarisible === 'visible') {
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
            localStorage.setItem('leafar_EASYGROUP.visible', leafarVisible);
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
        if (EG_EnabledCheck.checked) {
            localStorage.setItem('leafar_EASYGROUP.enabledCheck', 'ON');
        }
        else {
            localStorage.setItem('leafar_EASYGROUP.enabledCheck', 'OFF');
        }
        //Save Invite Randoms
        if (EG_InviteRandomsCheck.checked) {
            localStorage.setItem('leafar_EASYGROUP.inviteRandomsCheck', 'ON');
        }
        else {
            localStorage.setItem('leafar_EASYGROUP.inviteRandomsCheck', 'OFF');
        }
        //Save Invite Enemies
        if (EG_InviteEnemiesCheck.checked) {
            localStorage.setItem('leafar_EASYGROUP.inviteEnemiesCheck', 'ON');
        }
        else {
            localStorage.setItem('leafar_EASYGROUP.inviteEnemiesCheck', 'OFF');
        }
        //Save Messages
        if (EG_MessageCheck.checked) {
            localStorage.setItem('leafar_EASYGROUP.messageCheck', 'ON');
        }
        else {
            localStorage.setItem('leafar_EASYGROUP.messageCheck', 'OFF');
        }
        //Save Invite Bind
         if (EG_KeyBind.value.length === 0) {
            EG_KeyBind.value = localStorage.getItem('leafar_EASYGROUP.key')
        }
        else{
            EASYGROUPKey = EG_KeyBind.value;
            localStorage.setItem('leafar_EASYGROUP.key', EASYGROUPKey);
        }
        SettingsChangedText.textContent = '-';
        this.blur();
    });
    
    //Edit settings
    EG_EnabledCheck.addEventListener('change', function() {
        SettingsChangedText.textContent = 'Zapisz ustawienia';
        this.blur();
    });

    EG_AcceptCheck.addEventListener('change', function() {
        SettingsChangedText.textContent = 'Zapisz ustawienia';
        this.blur();
    });

    EG_InviteRandomsCheck.addEventListener('change', function() {
        SettingsChangedText.textContent = 'Zapisz ustawienia';
        this.blur();
    });

    EG_InviteEnemiesCheck.addEventListener('change', function() {
        SettingsChangedText.textContent = 'Zapisz ustawienia';
        this.blur();
    });

    EG_MessageCheck.addEventListener('change', function() {
        SettingsChangedText.textContent = 'Zapisz ustawienia';
        this.blur();
    });

EG_KeyBind.addEventListener('click', function() {
        changingSettings = true;
    });

EG_KeyBind.addEventListener('blur', function() {
        setTimeout(function() {
            changingSettings = false;
        }, 100);
    });
    
    let EASYGROUPKey = EG_KeyBind.value;
    EG_KeyBind.addEventListener('input', function() {
        if (EG_KeyBind.value.length === 0) {
            EG_KeyBind.placeholder = EASYGROUPKey;
            return;
        }
        else {
            SettingsChangedText.textContent = 'Zapisz ustawienia';
            setTimeout(function() {
                EG_KeyBind.blur();
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
        if(ev.key === localStorage.getItem('leafar_EASYGROUP.key') && !["INPUT", "TEXTAREA", "MAGIC_INPUT"].includes(ev.target.tagName)) {
            if (!changingSettings) {
                if (localStorage.getItem('leafar_EASYGROUP.enabledCheck') == 'ON') {
                    let EASYGROUPPlayersAdded = 0;
                    if (leafarGlobals.leafarInterfaceNI) {

                        if ((Engine.party && Engine.party.valueOf()) && Engine.hero.getId() !== Engine.party.getLeaderId()) {
                            if (localStorage.getItem('leafar_EASYGROUP.messageCheck') == 'ON') {
                                message("Nie jesteś dowódcą grupy.");
                            }
                        }
                        else if ((Engine.party && Engine.party.valueOf()) && Engine.party.countPartyPlayers() === 10) {
                            if (localStorage.getItem('leafar_EASYGROUP.messageCheck') == 'ON') {
                                message("Grupa posiada 10 członków.");
                            }
                        }
                        else {
                            Object.values(Engine.whoIsHere.getList()).forEach((playerData) => {
                                if (playerData instanceof Object && typeof playerData === 'object') {
                                    let otherPlayerID = Engine.others.getById(parseInt(playerData.id)).d;
                                    if (Array.isArray(Engine.others.getById(playerData.id).onSelfEmoList) && Engine.others.getById(playerData.id).onSelfEmoList.length > 0) {
                                        Object.values(Engine.others.getById(playerData.id).onSelfEmoList).forEach((emotion) => {
                                            if (emotion.name !== "battle" && emotion.name !== "stasis") {
                                                if (playerData.relation === "clan-members" || playerData.relation === "friends" || playerData.relation === "clan-friends") {
                                                    _g(`party&a=inv&id=${playerData.id}`);
                                                    EASYGROUPPlayersAdded++;
                                                }
                                                else if (localStorage.getItem('leafar_EASYGROUP.inviteRandomsCheck') == 'ON' && playerData.relation === "normal_players") {
                                                    let playerDistance = (Math.abs(Engine.hero.x - otherPlayerID.x) + Math.abs(Engine.hero.y - otherPlayerID.y));
                                                    if (playerDistance < 3) {
                                                        _g(`party&a=inv&id=${playerData.id}`);
                                                        EASYGROUPPlayersAdded++;
                                                    }
                                                }
                                                else if (localStorage.getItem('leafar_EASYGROUP.inviteEnemiesCheck') == 'ON' && playerData.relation === "clan-enemies") {
                                                    let playerDistance = (Math.abs(Engine.hero.x - otherPlayerID.x) + Math.abs(Engine.hero.y - otherPlayerID.y));
                                                    if (playerDistance < 3) {
                                                        _g(`party&a=inv&id=${playerData.id}`);
                                                        EASYGROUPPlayersAdded++;
                                                    }
                                                }
                                            }
                                        });
                                    }
                                    else {
                                        if (playerData.relation === "clan-members" || playerData.relation === "friends" || playerData.relation === "clan-friends") {
                                            _g(`party&a=inv&id=${playerData.id}`);
                                            EASYGROUPPlayersAdded++;
                                        }
                                        else if (localStorage.getItem('leafar_EASYGROUP.inviteRandomsCheck') == 'ON' && playerData.relation === "normal_players") {
                                            let playerDistance = (Math.abs(Engine.hero.x - otherPlayerID.x) + Math.abs(Engine.hero.y - otherPlayerID.y));
                                            if (playerDistance < 3) {
                                                _g(`party&a=inv&id=${playerData.id}`);
                                                EASYGROUPPlayersAdded++;
                                            }
                                        }
                                        else if (localStorage.getItem('leafar_EASYGROUP.inviteEnemiesCheck') == 'ON' && playerData.relation === "clan-enemies") {
                                            let playerDistance = (Math.abs(Engine.hero.x - otherPlayerID.x) + Math.abs(Engine.hero.y - otherPlayerID.y));
                                            if (playerDistance < 3) {
                                                _g(`party&a=inv&id=${playerData.id}`);
                                                EASYGROUPPlayersAdded++;
                                            }
                                        }
                                    }
                                }
                            });
                        }
                    }
                    else {
                        let EASYGROUPAllowInvite = false;
                        let EASYGROUPMembers = [];
                        if (g.party !== 0 && g.party !== false) {
                            Object.values(g.party).forEach((groupData) => {
                                if (groupData instanceof Object && typeof groupData === 'object') {
                                    EASYGROUPMembers.push(groupData.n);
                                    if (groupData.r === 1 && groupData.n === hero.nick) {
                                        EASYGROUPAllowInvite = true;
                                    }
                                }
                            });
                            if (localStorage.getItem('leafar_EASYGROUP.messageCheck') == 'ON' && !EASYGROUPAllowInvite) {
                                message("Nie jesteś dowódcą grupy.");
                            }
                        }
                        else {
                            EASYGROUPAllowInvite = true;
                        }
                        if (EASYGROUPAllowInvite === true && EASYGROUPMembers.length < 10) {
                            Object.values(g.other).forEach((playerData) => {
                                if (playerData instanceof Object && typeof playerData === 'object') {
                                    let EASYGROUPnotGroupMember = true;
                                    for ( let i = 0; i < EASYGROUPMembers.length; i++) {
                                        if ( EASYGROUPMembers[i] === playerData.nick ) {
                                            EASYGROUPnotGroupMember = false;
                                        }
                                    }
                                    if (EASYGROUPnotGroupMember === true) {
                                        if (playerData.relation === 2 || playerData.relation === 4 || playerData.relation === 5) {
                                            _g(`party&a=inv&id=${playerData.id}`);
                                            EASYGROUPPlayersAdded++;
                                        }
                                        else if (localStorage.getItem('leafar_EASYGROUP.inviteRandomsCheck') == 'ON' && (playerData.relation === 1 || playerData.relation === 7)) {
                                            let playerDistance = (Math.abs(hero.x - playerData.x) + Math.abs(hero.y - playerData.y));
                                            if (playerDistance < 3) {
                                                _g(`party&a=inv&id=${playerData.id}`);
                                                EASYGROUPPlayersAdded++;
                                            }
                                        }
                                        else if (localStorage.getItem('leafar_EASYGROUP.inviteEnemiesCheck') == 'ON' && (playerData.relation === 6 || playerData.relation === 8)) {
                                            let playerDistance = (Math.abs(hero.x - playerData.x) + Math.abs(hero.y - playerData.y));
                                            if (playerDistance < 3) {
                                                _g(`party&a=inv&id=${playerData.id}`);
                                                EASYGROUPPlayersAdded++;
                                            }
                                        }
                                    }
                                }

                            });
                        }
                    }
                    if (EASYGROUPPlayersAdded === 0) {
                        if (localStorage.getItem('leafar_EASYGROUP.messageCheck') == 'ON') {
                            message(`Nie znaleziono graczy do dodania.`);
                        }
                    }
                    else {
                        if (localStorage.getItem('leafar_EASYGROUP.messageCheck') == 'ON') {
                            message(`Zaproszono graczy na mapie.`);
                        }
                    }
                }
            }
        }
    });

    if (!leafarGlobals.leafarInterfaceNI) {
        let MAlert = mAlert;
        mAlert = function (a, b, c, d) {
            if (localStorage.getItem('leafar_EASYGROUP.acceptCheck') == 'ON') {
                if (a.includes("Czy chcesz dołączyć do drużyny gracza")) {
                    _g('party&a=accept&answer=1');
                }
                else {
                    MAlert(a, b, c, d)
                }
            }
            else {
                MAlert(a, b, c, d)
            }
        };
    }
    //---------------------
    //END OF SUB-ADDON CODE
    //---------------------
})();