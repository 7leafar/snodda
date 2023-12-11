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
    if (localStorage.getItem('leafar_AUTOHEAL.x') && localStorage.getItem('leafar_AUTOHEAL.y')) {
        ADDON_Main.style.left = localStorage.getItem('leafar_AUTOHEAL.x');
        ADDON_Main.style.top = localStorage.getItem('leafar_AUTOHEAL.y');
    }

    const ADDON_Top = document.createElement('div');
    ADDON_Top.classList.add("Rleafar_addon-settings-top");
    ADDON_Top.textContent = '[leafar] Auto Heal';

    const ADDON_Col = document.createElement('div');
    ADDON_Col.classList.add("leafar_main-column");

    const ADDON_Close = document.createElement('div');
    ADDON_Close.classList.add("leafar_addon-settings-close");
    ADDON_Close.textContent = 'X';

    const AH_EnabledText = document.createElement('span');
    AH_EnabledText.textContent = 'Włącz: ';
    AH_EnabledText.classList.add("leafar_addon-text");

    const AH_EnabledCheck = document.createElement('input');
    AH_EnabledCheck.type = 'checkbox';
    AH_EnabledCheck.style.cursor = 'url(https://nubes.margonem.pl/img/gui/cursor/5.png?v=1691053381869), auto';
    if (localStorage.getItem('leafar_AUTOHEAL.enabledCheck') === 'ON') {
        AH_EnabledCheck.checked = true;
    }
    else {
        AH_EnabledCheck.checked = false;
    }

    const AH_PotionFoundText = document.createElement('span');
    AH_PotionFoundText.textContent = '-';
    AH_PotionFoundText.classList.add("leafar_addon-title");

    const AH_UseFullHealText = document.createElement('span');
    AH_UseFullHealText.textContent = 'Używaj Full Healów: ';
    AH_UseFullHealText.classList.add("leafar_addon-text");

    const AH_UseFullHealCheck = document.createElement('input');
    AH_UseFullHealCheck.type = 'checkbox';
    AH_UseFullHealCheck.style.cursor = 'url(https://nubes.margonem.pl/img/gui/cursor/5.png?v=1691053381869), auto';
    if (localStorage.getItem('leafar_AUTOHEAL.fullHealCheck') === 'ON') {
        AH_UseFullHealCheck.checked = true;
    }
    else {
        AH_UseFullHealCheck.checked = false;
    }

    const AH_UsePercentHealText = document.createElement('span');
    AH_UsePercentHealText.textContent = "Używaj %'towych Healów: ";
    AH_UsePercentHealText.classList.add("leafar_addon-text");

    const AH_UsePercentHealCheck = document.createElement('input');
    AH_UsePercentHealCheck.type = 'checkbox';
    AH_UsePercentHealCheck.style.cursor = 'url(https://nubes.margonem.pl/img/gui/cursor/5.png?v=1691053381869), auto';
    if (localStorage.getItem('leafar_AUTOHEAL.percentHealCheck') === 'ON') {
        AH_UsePercentHealCheck.checked = true;
    }
    else {
        AH_UsePercentHealCheck.checked = false;
    }

    const AH_HealFromText = document.createElement('span');
    AH_HealFromText.textContent = 'Minimalny heal potek: ';
    AH_HealFromText.classList.add("leafar_addon-text");

    let AUTOHEALHealFrom;
    const AH_HealFromNumber = document.createElement('input');
    AH_HealFromNumber.type = 'text';
    AH_HealFromNumber.style.width = '45px';
    AH_HealFromNumber.style.height = '15px';
    AH_HealFromNumber.placeholder = '---hp';
    if (localStorage.getItem('leafar_AUTOHEAL.healFromNumber') !== null) {
        AH_HealFromNumber.value = localStorage.getItem('leafar_AUTOHEAL.healFromNumber');
    }
    else {
        AH_HealFromNumber.value = '1000';
    }

    const AH_HealBelowText = document.createElement('span');
    AH_HealBelowText.textContent = 'Lecz poniżej % HP: ';
    AH_HealBelowText.classList.add("leafar_addon-text");

    const AH_HealBelowInput = document.createElement('input');
    AH_HealBelowInput.type = 'text';
    AH_HealBelowInput.style.width = '45px';
    AH_HealBelowInput.style.height = '15px';
    AH_HealBelowInput.placeholder = '0-99 %';
    if (localStorage.getItem('leafar_AUTOHEAL.healBelow') !== null) {
        AH_HealBelowInput.value = localStorage.getItem('leafar_AUTOHEAL.healBelow');
    }
    else {
        AH_HealBelowInput.value = '';
    }

    const AH_ForceHealText = document.createElement('span');
    AH_ForceHealText.textContent = 'Zawsze lecz do 100%: ';
    AH_ForceHealText.classList.add("leafar_addon-text");

    const AH_ForceHealCheck = document.createElement('input');
    AH_ForceHealCheck.type = 'checkbox';
    AH_ForceHealCheck.style.cursor = 'url(https://nubes.margonem.pl/img/gui/cursor/5.png?v=1691053381869), auto';
    if (localStorage.getItem('leafar_AUTOHEAL.forceHealCheck') === 'ON') {
        AH_ForceHealCheck.checked = true;
    }
    else {
        AH_ForceHealCheck.checked = false;
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
        ADDON_Col.append(AH_EnabledText, AH_PotionFoundText, AH_UseFullHealText, AH_UsePercentHealText, AH_HealFromText, AH_HealBelowText, AH_ForceHealText, SettingsChangedText, SaveSettingsButton);
        AH_EnabledText.appendChild(AH_EnabledCheck);
        AH_UseFullHealText.appendChild(AH_UseFullHealCheck);
        AH_UsePercentHealText.appendChild(AH_UsePercentHealCheck);
        AH_HealFromText.appendChild(AH_HealFromNumber);
        AH_HealBelowText.appendChild(AH_HealBelowInput);
        AH_ForceHealText.appendChild(AH_ForceHealCheck);
        localStorage.setItem('leafar_AUTOHEAL.show', 'visible');
    }
    if (localStorage.getItem('leafar_AUTOHEAL.show') === 'visible') {
        SubAddon_Constructor();
    }

    function SubAddon_OpenWindow() {
        if (localStorage.getItem('leafar_AUTOHEAL.show') === 'visible') {
            SubAddon_CloseWindow();
        }
        else {
            SubAddon_Constructor();
        }
    }
    leafarGlobals.AH_SettingsButton.addEventListener('click', SubAddon_OpenWindow);

    function SubAddon_CloseWindow() {
        localStorage.setItem('leafar_AUTOHEAL.show', 'hidden');
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
            localStorage.setItem('leafar_AUTOHEAL.x', ADDON_Main.style.left);
            localStorage.setItem('leafar_AUTOHEAL.y', ADDON_Main.style.top);
        }
        document.addEventListener('mousemove', moveBox);
        document.addEventListener('mouseup', stopDrag);
    }
    ADDON_Top.addEventListener('mousedown', handleDrag);

    let leafarVisible = localStorage.getItem('leafar_AUTOHEAL.visible');
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
                ADDON_Top.style.width = '190px';
                ADDON_Main.style.border = '1px solid silver';
                ADDON_Main.style.width = '200px';
                leafarVisible = 'visible';
            }
            localStorage.setItem('leafar_AUTOHEAL.visible', leafarVisible);
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
        if (AH_EnabledCheck.checked) {
            localStorage.setItem('leafar_AUTOHEAL.enabledCheck', 'ON');
        }
        else {
            localStorage.setItem('leafar_AUTOHEAL.enabledCheck', 'OFF');
        }
        //Save Use Full Heals
        if (AH_UseFullHealCheck.checked) {
            localStorage.setItem('leafar_AUTOHEAL.fullHealCheck', 'ON');
        }
        else {
            localStorage.setItem('leafar_AUTOHEAL.fullHealCheck', 'OFF');
        }
        //Save Use Percent Heals
        if (AH_UsePercentHealCheck.checked) {
            localStorage.setItem('leafar_AUTOHEAL.percentHealCheck', 'ON');
        }
        else {
            localStorage.setItem('leafar_AUTOHEAL.percentHealCheck', 'OFF');
        }
        //Save Heal From Number
        if (AH_HealFromNumber.value.length === 0) {
            localStorage.setItem('leafar_AUTOHEAL.healFromNumber', 1000);
        }
        else {
            localStorage.setItem('leafar_AUTOHEAL.healFromNumber', AH_HealFromNumber.value);
        }
        //Save Heal below
        if (AH_HealBelowInput.value.length === 0) {
            localStorage.setItem('leafar_AUTOHEAL.healBelow', 70);
        }
        else {
            localStorage.setItem('leafar_AUTOHEAL.healBelow', AH_HealBelowInput.value);
        }
        //Save Force Heal
        if (AH_ForceHealCheck.checked) {
            localStorage.setItem('leafar_AUTOHEAL.forceHealCheck', 'ON');
        }
        else {
            localStorage.setItem('leafar_AUTOHEAL.forceHealCheck', 'OFF');
        }
        SettingsChangedText.textContent = '-';
        this.blur();
    });

    //Edit settings
    AH_EnabledCheck.addEventListener('change', function() {
        SettingsChangedText.textContent = 'Zapisz ustawienia';
        this.blur();
    });

    AH_UseFullHealCheck.addEventListener('change', function() {
        SettingsChangedText.textContent = 'Zapisz ustawienia';
        this.blur();
    });

    AH_UsePercentHealCheck.addEventListener('change', function() {
        SettingsChangedText.textContent = 'Zapisz ustawienia';
        this.blur();
    });

    AH_HealFromNumber.addEventListener('blur', function() {
        SettingsChangedText.textContent = 'Zapisz ustawienia';
        this.blur();
    });

    AH_HealBelowInput.addEventListener('blur', function() {
        SettingsChangedText.textContent = 'Zapisz ustawienia';
        this.blur();
    });

    AH_HealBelowInput.addEventListener('input', function() {
        SettingsChangedText.textContent = 'Zapisz ustawienia';
        AH_HealBelowInput.value = AH_HealBelowInput.value.replace(/[^0-99]/g, '');
        changingSettings = true;
        if (AH_HealBelowInput.value.length === 1) {
            return;
        }
        else {
            if (AH_HealBelowInput.value > 99) {
                AH_HealBelowInput.value = 99;
            }
            else if (AH_HealBelowInput.value < 0) {
                AH_EmptySpaceInput.value = 0;
            }
            localStorage.setItem('leafar_AUTOHEAL.healBelow', AH_HealBelowInput.value);
        }

        AH_ForceHealCheck.addEventListener('blur', function() {
            SettingsChangedText.textContent = 'Zapisz ustawienia';
        });
        this.blur();
    });
    //----------------------
    //END OF WINDOW SETTINGS
    //----------------------

    //--------------
    //SUB-ADDON CODE
    //--------------
    // ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://github.com/itsRews/itsRews.github.io/blob/main/addons/AutoHeal.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        none
// ==/UserScript==

const waitForSeconds = (time) => new Promise(resolve => setTimeout(resolve, time * 1000));
let healingInProgress = false;

let playerMaxHP;
let playerCurrentHP;
let playerLevel;
let playerDead;
let itemsInBag;
let normalPotions;
let fullHealPotions;
let percentPotions;

if (leafarGlobals.leafarInterfaceNI) {
    playerMaxHP = Engine.hero.d.maxhp;
    playerCurrentHP = Engine.hero.d.hp;
    playerLevel = Engine.hero.d.lvl;
    playerDead = Engine.dead;
    itemsInBag = Engine.items.fetchLocationItems('g');
}
else {
    playerMaxHP = hero.maxhp;
    playerCurrentHP = hero.hp;
    playerLevel = hero.lvl;
    playerDead = g.dead;
    itemsInBag = getHItems();
}

if (leafarGlobals.leafarInterfaceNI) {
    let AUTOHEALServerMessage = Engine.communication.onMessageWebSocket;
    Engine.communication.onMessageWebSocket = function(event) {
        AUTOHEALServerMessage.apply(this, arguments);
        if (localStorage.getItem('leafar_AUTOHEAL.enabledCheck') === 'ON') {
            if (Math.floor((Engine.hero.d.hp/Engine.hero.d.maxhp)*100) < localStorage.getItem('leafar_AUTOHEAL.healBelow') && !healingInProgress) {
                healingInProgress = true;
                startHealing();
            }
        }
    }
}
else {
    webSocket.addEventListener("message", (event) => {
        if (localStorage.getItem('leafar_AUTOHEAL.enabledCheck') === 'ON') {
            if (Math.floor((hero.hp/hero.maxhp)*100) < localStorage.getItem('leafar_AUTOHEAL.healBelow') && !healingInProgress) {
                healingInProgress = true;
                startHealing();
            }
        }
    });
}


async function findPotions() {
    let normalPotions = [];
    let fullHealPotions = [];
    let percentPotions = [];


    if (localStorage.getItem('leafar_AUTOHEAL.enabledCheck') === 'ON') {
        normalPotions = Object.values(itemsInBag).filter(item => {
            if (
                item._cachedStats.hasOwnProperty("leczy") &&
                item._cachedStats.leczy > Number(localStorage.getItem('leafar_AUTOHEAL.healFromNumber')) &&
                (!item._cachedStats.hasOwnProperty("lvl") || (item._cachedStats.hasOwnProperty("lvl") && item._cachedStats.lvl <= playerLevel)) &&
                (!item._cachedStats.hasOwnProperty("timelimit") || (item._cachedStats.hasOwnProperty("timelimit") && !item._cachedStats.timelimit.includes(",")))
            ) {
                return true;
            }
            return false;
        }).sort((a, b) => b._cachedStats.leczy - a._cachedStats.leczy);
    }

    if (localStorage.getItem('leafar_AUTOHEAL.fullHealCheck') === 'ON') {
        fullHealPotions = Object.values(itemsInBag).filter(item => {
            if (
                item._cachedStats.hasOwnProperty("fullheal") &&
                (!item._cachedStats.hasOwnProperty("lvl") || (item._cachedStats.hasOwnProperty("lvl") && item._cachedStats.lvl <= playerLevel)) &&
                (!item._cachedStats.hasOwnProperty("timelimit") || (item._cachedStats.hasOwnProperty("timelimit") && !item._cachedStats.timelimit.includes(",")))
            ) {
                return true;
            }
            return false;
        }).sort((a, b) => b._cachedStats.fullheal - a._cachedStats.fullheal);
    }

    if (localStorage.getItem('leafar_AUTOHEAL.percentHealCheck') === 'ON') {
        percentPotions = Object.values(itemsInBag).filter(item => {
            if (
                item._cachedStats.hasOwnProperty("perheal") &&
                item._cachedStats.perheal > 0 &&
                (!item._cachedStats.hasOwnProperty("lvl") || (item._cachedStats.hasOwnProperty("lvl") && item._cachedStats.lvl <= playerLevel)) &&
                (!item._cachedStats.hasOwnProperty("timelimit") || (item._cachedStats.hasOwnProperty("timelimit") && !item._cachedStats.timelimit.includes(",")))
            ) {
                return true;
            }
            return false;
        }).sort((a, b) => b._cachedStats.perheal - a._cachedStats.perheal);
    }

    return [normalPotions, fullHealPotions, percentPotions];
}

async function startHealing() {
    if (playerCurrentHP <= (playerMaxHP * (localStorage.getItem('leafar_AUTOHEAL.healBelow') / 100))) {
        await waitForSeconds(0.25);

        if (playerCurrentHP == playerMaxHP ||  playerDead) {
            healingInProgress = false;
            return;
        }
    }

    let arrays = await findPotions();

    normalPotions = arrays[0];
    fullHealPotions = arrays[1];
    percentPotions = arrays[2];

    for (let i = 0; i < percentPotions.length; i++) {

        if (((percentPotions[i]._cachedStats.perheal / 100) * playerMaxHP) <= playerMaxHP - playerCurrentHP) {
            _g(`moveitem&st=1&id=${percentPotions[i].id}`);
            await waitForSeconds(0.25);

            healingInProgress = false;
            return;
        }
    }

    for (let i = 0; i < normalPotions.length; i++) {
        if (normalPotions[i]._cachedStats.leczy <= playerMaxHP - playerCurrentHP) {
            _g(`moveitem&st=1&id=${normalPotions[i].id}`);
            await waitForSeconds(0.25);

            healingInProgress = false;
            return;
        }
    }

    if (fullHealPotions.length > 0) {
        _g(`moveitem&st=1&id=${fullHealPotions[0].id}`);
        await waitForSeconds(0.25);

        healingInProgress = false;
        return;
    }

    if (localStorage.getItem('leafar_AUTOHEAL.forceHealCheck') == 'ON') {
        for (let i = 0; i < normalPotions.length; i++) {
            _g(`moveitem&st=1&id=${normalPotions[i].id}`);
            await waitForSeconds(0.25);

            healingInProgress = false;
            return;
        }
    }
}

    //---------------------
    //END OF SUB-ADDON CODE
    //---------------------
})();