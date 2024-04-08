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
    if (localStorage.getItem('leafar_ITEMENHANCER.x') && localStorage.getItem('leafar_ITEMENHANCER.y')) {
        ADDON_Main.style.left = localStorage.getItem('leafar_ITEMENHANCER.x');
        ADDON_Main.style.top = localStorage.getItem('leafar_ITEMENHANCER.y');
    }

    const ADDON_Top = document.createElement('div');
    ADDON_Top.classList.add("leafar_addon-settings-top");
    ADDON_Top.textContent = '[leafar] Item Enhancer';

    const ADDON_Col = document.createElement('div');
    ADDON_Col.classList.add("leafar_main-column");

    const ADDON_Close = document.createElement('div');
    ADDON_Close.classList.add("leafar_addon-settings-close");
    ADDON_Close.textContent = 'X';

    const IE_EnabledText = document.createElement('span');
    IE_EnabledText.textContent = 'Włącz: ';
    IE_EnabledText.classList.add("leafar_addon-text");

    const IE_EnabledCheck = document.createElement('input');
    IE_EnabledCheck.type = 'checkbox';
    IE_EnabledCheck.style.cursor = 'url(https://nubes.margonem.pl/img/gui/cursor/5.png?v=1691053381869), auto';
    if (localStorage.getItem('leafar_ITEMENHANCER.enabledCheck') === 'ON') {
        IE_EnabledCheck.checked = true;
    }
    else {
        IE_EnabledCheck.checked = false;
    }

    const IE_ItemFoundText = document.createElement('span');
    IE_ItemFoundText.textContent = '-';
    IE_ItemFoundText.classList.add("leafar_addon-title");

    const IE_ItemIdText = document.createElement('span');
    IE_ItemIdText.textContent = 'Item: ';
    IE_ItemIdText.classList.add("leafar_addon-text");

    let ITEMENHANCERItemName;
    let ITEMENHANCERItemHid;
    let ITEMENHANCERItemId;
    const IE_ItemNumber = document.createElement('input');
    IE_ItemNumber.type = 'text';
    IE_ItemNumber.style.width = '125px';
    IE_ItemNumber.style.height = '15px';
    IE_ItemNumber.placeholder = 'ITEM#xxxxxx.świat';
    if (localStorage.getItem('leafar_ITEMENHANCER.itemNumber') !== null) {
        IE_ItemNumber.value = localStorage.getItem('leafar_ITEMENHANCER.itemNumber');
    }
    else {
        IE_ItemNumber.value = '';
    }


    const IE_UseUniqueItemsText = document.createElement('span');
    IE_UseUniqueItemsText.textContent = 'Spalaj unikaty: ';
    IE_UseUniqueItemsText.classList.add("leafar_addon-text");

    const IE_UseUniqueItemsCheck = document.createElement('input');
    IE_UseUniqueItemsCheck.type = 'checkbox';
    IE_UseUniqueItemsCheck.style.cursor = 'url(https://nubes.margonem.pl/img/gui/cursor/5.png?v=1691053381869), auto';
    if (localStorage.getItem('leafar_ITEMENHANCER.uniqueCheck') === 'ON') {
        IE_UseUniqueItemsCheck.checked = true;
    }
    else {
        IE_UseUniqueItemsCheck.checked = false;
    }

    const IE_EmptySpaceText = document.createElement('span');
    IE_EmptySpaceText.textContent = 'Ulepszaj przy slotach: ';
    IE_EmptySpaceText.classList.add("leafar_addon-text");

    const IE_EmptySpaceInput = document.createElement('input');
    IE_EmptySpaceInput.type = 'text';
    IE_EmptySpaceInput.style.width = '30px';
    IE_EmptySpaceInput.style.height = '15px';
    IE_EmptySpaceInput.placeholder = '1-9';
    if (localStorage.getItem('leafar_ITEMENHANCER.emptySpace') !== null) {
        IE_EmptySpaceInput.value = localStorage.getItem('leafar_ITEMENHANCER.emptySpace');
    }
    else {
        IE_EmptySpaceInput.value = '';
    }

    const IE_ItemsUsedText = document.createElement('span');
    IE_ItemsUsedText.classList.add("leafar_addon-text");
    IE_ItemsUsedText.textContent = 'Dodatek spalił 0 przedmiotów';

    const IE_ItemsUsedButton = document.createElement('input');
    IE_ItemsUsedButton.classList.add("leafar_addon-button");
    IE_ItemsUsedButton.type = 'button';
    IE_ItemsUsedButton.value = 'Zresetuj licznik';

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
        ADDON_Col.append(IE_EnabledText, IE_ItemFoundText, IE_ItemIdText, IE_UseUniqueItemsText, IE_EmptySpaceText, IE_ItemsUsedText, IE_ItemsUsedButton, SettingsChangedText, SaveSettingsButton);
        IE_EnabledText.appendChild(IE_EnabledCheck);
        IE_ItemIdText.appendChild(IE_ItemNumber);
        IE_UseUniqueItemsText.appendChild(IE_UseUniqueItemsCheck);
        IE_EmptySpaceText.appendChild(IE_EmptySpaceInput);
        localStorage.setItem('leafar_ITEMENHANCER.show', 'visible');
    }
    if (localStorage.getItem('leafar_ITEMENHANCER.show') === 'visible') {
        SubAddon_Constructor();
    }

    function SubAddon_OpenWindow() {
        if (localStorage.getItem('leafar_ITEMENHANCER.show') === 'visible') {
            SubAddon_CloseWindow();
        }
        else {
            SubAddon_Constructor();
        }
    }
    leafarGlobals.IE_SettingsButton.addEventListener('click', SubAddon_OpenWindow);

    function SubAddon_CloseWindow() {
        localStorage.setItem('leafar_ITEMENHANCER.show', 'hidden');
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
            localStorage.setItem('leafar_ITEMENHANCER.x', ADDON_Main.style.left);
            localStorage.setItem('leafar_ITEMENHANCER.y', ADDON_Main.style.top);
        }
        document.addEventListener('mousemove', moveBox);
        document.addEventListener('mouseup', stopDrag);
    }
    ADDON_Top.addEventListener('mousedown', handleDrag);

    let leafarVisible = localStorage.getItem('leafar_ITEMENHANCER.visible');
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
            localStorage.setItem('leafar_ITEMENHANCER.visible', leafarVisible);
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
        ITEMENHANCERFindItemDataFromInput();
        //Save Enabled
        if (IE_EnabledCheck.checked) {
            localStorage.setItem('leafar_ITEMENHANCER.enabledCheck', 'ON');
        }
        else {
            localStorage.setItem('leafar_ITEMENHANCER.enabledCheck', 'OFF');
        }
        //Save Use Unique Items
        if (IE_UseUniqueItemsCheck.checked) {
            localStorage.setItem('leafar_ITEMENHANCER.uniqueCheck', 'ON');
        }
        else {
            localStorage.setItem('leafar_ITEMENHANCER.uniqueCheck', 'OFF');
        }
        //Save Item
        if (IE_ItemNumber.value.length === 0) {
            localStorage.setItem('leafar_ITEMENHANCER.itemNumber', '');
        }
        else {
            localStorage.setItem('leafar_ITEMENHANCER.itemNumber', IE_ItemNumber.value);
        }
        //Save Empty Space
        if (IE_EmptySpaceInput.value.length === 0) {
            localStorage.setItem('leafar_ITEMENHANCER.emptySpace', 9);
        }
        else {
            localStorage.setItem('leafar_ITEMENHANCER.emptySpace', IE_EmptySpaceInput.value);
        }
        SettingsChangedText.textContent = '-';
        this.blur();
    });

    //Edit settings
    IE_EnabledCheck.addEventListener('change', function() {
        SettingsChangedText.textContent = 'Zapisz ustawienia';
        this.blur();
    });

    IE_UseUniqueItemsCheck.addEventListener('change', function() {
        SettingsChangedText.textContent = 'Zapisz ustawienia';
        this.blur();
    });

    IE_ItemNumber.addEventListener('blur', function() {
        SettingsChangedText.textContent = 'Zapisz ustawienia';
    });

    IE_EmptySpaceInput.addEventListener('blur', function() {
        SettingsChangedText.textContent = 'Zapisz ustawienia';
    });

    IE_EmptySpaceInput.addEventListener('input', function() {
        SettingsChangedText.textContent = 'Zapisz ustawienia';
        IE_EmptySpaceInput.value = IE_EmptySpaceInput.value.replace(/[^0-9]/g, '');
        changingSettings = true;
        if (IE_EmptySpaceInput.value.length === 0) {
            return;
        }
        else {
            if (IE_EmptySpaceInput.value > 10) {
                IE_EmptySpaceInput.value = 9;
            }
            else if (IE_EmptySpaceInput.value < 0) {
                IE_EmptySpaceInput.value = 1;
            }
            localStorage.setItem('leafar_ITEMENHANCER.emptySpace', IE_EmptySpaceInput.value);
        }
        this.blur();
    });

    function ITEMENHANCERItemsUsedResetClick() {
        ITEMENHANCERItemsUsed = 0;
        localStorage.setItem("leafar_ITEMENHANCER.itemsUsed", ITEMENHANCERItemsUsed);
        IE_ItemsUsedText.textContent = `Dodatek spalił ${ITEMENHANCERItemsUsed} przedmiotów`;
        this.blur();
    }
    IE_ItemsUsedButton.addEventListener('click', ITEMENHANCERItemsUsedResetClick);
    //----------------------
    //END OF WINDOW SETTINGS
    //----------------------

    //--------------
    //SUB-ADDON CODE
    //--------------
    let ITEMENHANCERCommonItemList = [];
    if (localStorage.getItem('leafar_ITEMENHANCER.itemsArray') !== null) {
        try {
            ITEMENHANCERCommonItemList = JSON.parse(localStorage.getItem('leafar_ITEMENHANCER.itemsArray'));
        }
        catch {
            localStorage.setItem('leafar_ITEMENHANCER.itemsArray', "");
        }
    }
    let ITEMENHANCERCommonItemIdList = [];
    let ITEMENHANCERItemWasEnhanced = false;
    let ITEMENHANCERMessageWasShown = false;
    let ITEMENHANCERItemsUsed = 0;
    if (localStorage.getItem('leafar_ITEMENHANCER.itemsUsed') !== null) {
        ITEMENHANCERItemsUsed = localStorage.getItem('leafar_ITEMENHANCER.itemsUsed');
        IE_ItemsUsedText.textContent = `Dodatek spalił ${ITEMENHANCERItemsUsed} przedmiotów`;
    }

    function ITEMENHANCERFindItemDataFromInput() {
        if (localStorage.getItem('leafar_ITEMENHANCER.enabledCheck') === 'ON') {
            const ITEMENHANCERFindMiddle = /#(.*?)\./;
            let ITEMENHANCERItemNumberValue = (IE_ItemNumber.value).match(ITEMENHANCERFindMiddle);
            try {
                ITEMENHANCERItemHid = ITEMENHANCERItemNumberValue[1];
            }
            catch {
                message('Item Enhancer: Nieodpowiedni numer przedmiotu.');
            }
            let ITEMENHANCERFoundItem = false;

            if (leafarGlobals.leafarInterfaceNI) {
                Engine.items.fetchLocationItems('g').forEach((foundItems) => {
                    if (foundItems instanceof Object && typeof foundItems === 'object') {
                        if (foundItems.hid === ITEMENHANCERItemHid) {
                            ITEMENHANCERItemName = foundItems.name;
                            ITEMENHANCERItemId = foundItems.id;
                            ITEMENHANCERFoundItem = true;
                        }
                    }
                });
            }
            else {
                Object.values(g.hItems).forEach((foundItems) => {
                    if (foundItems.hid === ITEMENHANCERItemHid) {
                        ITEMENHANCERItemName = foundItems.name;
                        ITEMENHANCERItemId = foundItems.id;
                        ITEMENHANCERFoundItem = true;
                    }
                });
            }
            if (ITEMENHANCERFoundItem === false) {
                IE_ItemFoundText.textContent = 'Nie znaleziono przedmiotu.';
            }
            else {
                IE_ItemFoundText.textContent = ITEMENHANCERItemName;
            }
        }
    }

    if (leafarGlobals.leafarInterfaceNI) {
        let ITEMENHANCERServerMessage = Engine.communication.onMessageWebSocket;
        Engine.communication.onMessageWebSocket = function(event) {
            ITEMENHANCERServerMessage.apply(this, arguments);
            if (localStorage.getItem('leafar_ITEMENHANCER.enabledCheck') === 'ON') {
                if (Engine.heroEquipment.getFreeSlots() > localStorage.getItem('leafar_ITEMENHANCER.emptySpace')) {
                    const ITEMENHANCERMessageData = JSON.parse(event.data);
                    if (ITEMENHANCERMessageData.loot && ITEMENHANCERMessageData.item) {
                        const ITEMENHANCERItemKeys = Object.keys(ITEMENHANCERMessageData.item);
                        ITEMENHANCERItemKeys.forEach(itemKey => {
                                const item = ITEMENHANCERMessageData.item[itemKey];
                                if (localStorage.getItem('leafar_ITEMENHANCER.uniqueCheck') === 'ON') {
                                    if (item.hid && item.stat && (item.stat.includes("common") || item.stat.includes("unique")) && (item.cl === 1 || item.cl === 2 || item.cl === 3 || item.cl === 4 || item.cl === 5 ||
                                                                                                                                    item.cl === 6 || item.cl === 7 || item.cl === 8 || item.cl === 9 || item.cl === 10 ||
                                                                                                                                    item.cl === 11 || item.cl === 12 || item.cl === 13 || item.cl === 14 || item.cl === 29)) {
                                        if (!ITEMENHANCERCommonItemList.includes(item.hid)) {
                                            ITEMENHANCERMessageWasShown = false;
                                            ITEMENHANCERCommonItemList.push(item.hid);
                                            localStorage.setItem("leafar_ITEMENHANCER.itemsArray", JSON.stringify(ITEMENHANCERCommonItemList));
                                        }
                                    }
                                }
                                else {
                                    if (item.hid && item.stat && item.stat.includes("common") && (item.cl === 1 || item.cl === 2 || item.cl === 3 || item.cl === 4 || item.cl === 5 ||
                                                                                                  item.cl === 6 || item.cl === 7 || item.cl === 8 || item.cl === 9 || item.cl === 10 ||
                                                                                                  item.cl === 11 || item.cl === 12 || item.cl === 13 || item.cl === 14 || item.cl === 29)) {
                                        if (!ITEMENHANCERCommonItemList.includes(item.hid)) {
                                            ITEMENHANCERMessageWasShown = false;
                                            ITEMENHANCERCommonItemList.push(item.hid);
                                            localStorage.setItem("leafar_ITEMENHANCER.itemsArray", JSON.stringify(ITEMENHANCERCommonItemList));
                                        }
                                    }
                                }
                            });
                    }
                    }
                    else {
                        if (ITEMENHANCERCommonItemList.length === 0) {
                            if (ITEMENHANCERMessageWasShown === false) {
                                let minimumSpaceMessage = localStorage.getItem('leafar_ITEMENHANCER.emptySpace');
                                message(`Item Enhancer: Wymagane jest minimum ${minimumSpaceMessage} miejsc w torbie`);
                            }
                            ITEMENHANCERMessageWasShown = true;
                        }
                        else {
                            Engine.items.fetchLocationItems('g').forEach((foundItems) => {
                                if(foundItems instanceof Object && typeof foundItems === 'object') {
                                    if (ITEMENHANCERCommonItemList.includes(foundItems.hid)) {
                                        ITEMENHANCERCommonItemIdList.push(foundItems.id);
                                        ITEMENHANCERItemsUsed++;
                                        localStorage.setItem("leafar_ITEMENHANCER.itemsUsed", ITEMENHANCERItemsUsed);
                                    }
                                }
                            });
                            ITEMENHANCERCommonItemList = [];
                            localStorage.setItem("leafar_ITEMENHANCER.itemsArray", "");
                            if (ITEMENHANCERCommonItemIdList.length !== 0) {
                                _g('artisanship&action=open');
                                const n = ITEMENHANCERCommonItemIdList.join(',');
                                _g(`enhancement&action=progress&item=${ITEMENHANCERItemId}&ingredients=${n}`);
                                ITEMENHANCERItemWasEnhanced = true;
                            }
                            ITEMENHANCERCommonItemIdList = [];
                            setTimeout(() => {
                                Engine.crafting.triggerClose();
                            }, 500);
                            let ItemsUsedTotal = localStorage.getItem("leafar_ITEMENHANCER.itemsUsed");
                            IE_ItemsUsedText.textContent = `Dodatek przepalił ${ItemsUsedTotal} przedmiotów.`;
                        }
                    }

                }
            
        }
    }
    else {
        webSocket.addEventListener("message", (event) => {
            if (localStorage.getItem('leafar_ITEMENHANCER.enabledCheck') === 'ON') {
                if (g.freeSlots > localStorage.getItem('leafar_ITEMENHANCER.emptySpace')) {
                    const ITEMENHANCERMessageData = JSON.parse(event.data);
                    if (ITEMENHANCERMessageData.loot && ITEMENHANCERMessageData.item) {
                        const ITEMENHANCERItemKeys = Object.keys(ITEMENHANCERMessageData.item);
                        ITEMENHANCERItemKeys.forEach(itemKey => {
                            const item = ITEMENHANCERMessageData.item[itemKey];
                            if (localStorage.getItem('leafar_ITEMENHANCER.uniqueCheck') === 'ON') {
                                if (item.hid && item.stat && (item.stat.includes("common") || item.stat.includes("unique")) && (item.cl === 1 || item.cl === 2 || item.cl === 3 || item.cl === 4 || item.cl === 5 ||
                                                                                                                                item.cl === 6 || item.cl === 7 || item.cl === 8 || item.cl === 9 || item.cl === 10 ||
                                                                                                                                item.cl === 11 || item.cl === 12 || item.cl === 13 || item.cl === 14 || item.cl === 29)) {
                                    if (!ITEMENHANCERCommonItemList.includes(item.hid)) {
                                        ITEMENHANCERMessageWasShown = false;
                                        ITEMENHANCERCommonItemList.push(item.hid);
                                        localStorage.setItem("leafar_ITEMENHANCER.itemsArray", JSON.stringify(ITEMENHANCERCommonItemList));
                                    }
                                }
                            }
                            else {
                                if (item.hid && item.stat && item.stat.includes("common") && (item.cl === 1 || item.cl === 2 || item.cl === 3 || item.cl === 4 || item.cl === 5 ||
                                                                                              item.cl === 6 || item.cl === 7 || item.cl === 8 || item.cl === 9 || item.cl === 10 ||
                                                                                              item.cl === 11 || item.cl === 12 || item.cl === 13 || item.cl === 14 || item.cl === 29)) {
                                    if (!ITEMENHANCERCommonItemList.includes(item.hid)) {
                                        ITEMENHANCERMessageWasShown = false;
                                        ITEMENHANCERCommonItemList.push(item.hid);
                                        localStorage.setItem("leafar_ITEMENHANCER.itemsArray", JSON.stringify(ITEMENHANCERCommonItemList));
                                    }
                                }
                            }
                        });
                    }
                }
                else {
                    if (ITEMENHANCERCommonItemList.length === 0) {
                        if (ITEMENHANCERMessageWasShown === false) {
                            let minimumSpaceMessage = localStorage.getItem('leafar_ITEMENHANCER.emptySpace');
                            message(`Item Enhancer: Wymagane jest minimum ${minimumSpaceMessage} miejsc w torbie`);
                        }
                        ITEMENHANCERMessageWasShown = true;
                    }
                    else {
                        Object.values(g.hItems).forEach((foundItems) => {
                            if (ITEMENHANCERCommonItemList.includes(foundItems.hid)) {
                                ITEMENHANCERCommonItemIdList.push(foundItems.id);
                                ITEMENHANCERItemsUsed++;
                                localStorage.setItem("leafar_ITEMENHANCER.itemsUsed", ITEMENHANCERItemsUsed);
                            }
                        });
                        ITEMENHANCERCommonItemList = [];
                        localStorage.setItem("leafar_ITEMENHANCER.itemsArray", "");
                        if (ITEMENHANCERCommonItemIdList.length !== 0) {
                            _g('artisanship&action=open');
                            const n = ITEMENHANCERCommonItemIdList.join(',');
                            setTimeout(() => { }, 100);
                            _g(`enhancement&action=progress&item=${ITEMENHANCERItemId}&ingredients=${n}`);
                            ITEMENHANCERItemWasEnhanced = true;
                            setTimeout(() => { }, 100);
                        }
                        ITEMENHANCERCommonItemIdList = [];
                        setTimeout(() => {
                            g.crafting.triggerClose();
                        }, 500);
                        let ItemsUsedTotal = localStorage.getItem("leafar_ITEMENHANCER.itemsUsed");
                        IE_ItemsUsedText.textContent = `Dodatek przepalił ${ItemsUsedTotal} przedmiotów.`;
                    }
                }
            }
        });
    }


    ITEMENHANCERFindItemDataFromInput();

            //---------------------
            //END OF SUB-ADDON CODE
            //---------------------
        })();
