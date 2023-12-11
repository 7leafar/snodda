const leafarGlobals = {};
leafarGlobals.leafarInterfaceNI = typeof Engine !== 'undefined' && typeof Engine.hero !== 'undefined';

function leafarRemoveAllChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    element.parentNode.removeChild(element);
}

(function() {
    $(document).ready(function() {
        $("head").append(`<link rel="stylesheet" type="text/css" href="https://7leafar.github.io/main/lenap.css?v=${Math.random()}">`);
    });

    //-------------
    //HTML ELEMENTS
    //-------------
    //Main leafar elements
    leafarGlobals.leafar_Main = document.createElement('div');
    leafarGlobals.leafar_Main.id = 'leafar_main-body';
    if (localStorage.getItem('leafar_MAIN.x') && localStorage.getItem('leafar_MAIN.y')) {
        leafarGlobals.leafar_Main.style.left = localStorage.getItem('leafar_MAIN.x');
        leafarGlobals.leafar_Main.style.top = localStorage.getItem('leafar_MAIN.y');
    }
    
    leafarGlobals.leafar_Top = document.createElement('div');
    leafarGlobals.leafar_Top.id = 'leafar_main-top';
    leafarGlobals.leafar_Top.textContent = '[leafar] Panel Dodatków';

    //-----------
    //LEFT COLUMN
    //-----------
    leafarGlobals.leafar_Col1 = document.createElement('div');
    leafarGlobals.leafar_Col1.classList.add("leafar_main-column");

    //Saving settings
    leafarGlobals.leafar_SaveSettingsText = document.createElement('span');
    leafarGlobals.leafar_SaveSettingsText.classList.add("leafar_alert-text");
    leafarGlobals.leafar_SaveSettingsText.textContent = "-";
    
    leafarGlobals.leafar_SaveSettingsButton = document.createElement('input');
    leafarGlobals.leafar_SaveSettingsButton.classList.add("leafar_addon-button");
    leafarGlobals.leafar_SaveSettingsButton.type = 'button';
    leafarGlobals.leafar_SaveSettingsButton.value = 'Zapisz';

    leafarGlobals.leafar_SaveAndReloadButton = document.createElement('input');
    leafarGlobals.leafar_SaveAndReloadButton.classList.add("leafar_addon-button");
    leafarGlobals.leafar_SaveAndReloadButton.type = 'button';
    leafarGlobals.leafar_SaveAndReloadButton.value = 'Zapisz i odśwież';

    //Loot Logs
    //Easy Group
    leafarGlobals.LL_Main = document.createElement('div');
    leafarGlobals.LL_Main.classList.add("leafar_addon-new");

    leafarGlobals.LL_Title = document.createElement('span');
    leafarGlobals.LL_Title.classList.add("leafar_addon-title");
    leafarGlobals.LL_Title.textContent = "[Loot Logs]";

    leafarGlobals.LL_EnabledText = document.createElement('span');
    leafarGlobals.LL_EnabledText.classList.add("leafar_addon-text");
    leafarGlobals.LL_EnabledText.textContent = "Włącz: ";

    leafarGlobals.LL_EnabledCheck = document.createElement('input');
    leafarGlobals.LL_EnabledCheck.type = 'checkbox';
    leafarGlobals.LL_EnabledCheck.style.cursor = 'url(https://nubes.margonem.pl/img/gui/cursor/5.png?v=1691053381869), auto';
    if (localStorage.getItem('leafar_LOOTLOGS.check') === 'ON') {
        leafarGlobals.LL_EnabledCheck.checked = true;
        $.getScript(`https://7leafar.github.io/snodda/sgoLtooL.js?v=${Math.random()}`);
    }
    else {
        leafarGlobals.LL_EnabledCheck.checked = false;
    }

    leafarGlobals.LL_SettingsButton = document.createElement('input');
    leafarGlobals.LL_SettingsButton.classList.add("leafar_addon-button");
    leafarGlobals.LL_SettingsButton.type = 'button';
    leafarGlobals.LL_SettingsButton.value = 'Otwórz';
    if (localStorage.getItem('leafar_LOOTLOGS.check') === 'ON') {
        leafarGlobals.LL_SettingsButton.disabled = false;
    }
    else {
        leafarGlobals.LL_SettingsButton.disabled = true;
    }

    //-------------
    //MIDDLE COLUMN
    //-------------
    leafarGlobals.leafar_Col2 = document.createElement('div');
    leafarGlobals.leafar_Col2.classList.add("leafar_main-column");

    //Safe Attack
    leafarGlobals.SA_Main = document.createElement('div');
    leafarGlobals.SA_Main.classList.add("leafar_addon-new");
    
    leafarGlobals.SA_Title = document.createElement('span');
    leafarGlobals.SA_Title.classList.add("leafar_addon-title");
    leafarGlobals.SA_Title.textContent = "[Safe Attack]";
    
    leafarGlobals.SA_EnabledText = document.createElement('span');
    leafarGlobals.SA_EnabledText.classList.add("leafar_addon-text");
    leafarGlobals.SA_EnabledText.textContent = "Włącz: ";

    leafarGlobals.SA_EnabledCheck = document.createElement('input');
    leafarGlobals.SA_EnabledCheck.type = 'checkbox';
    leafarGlobals.SA_EnabledCheck.style.cursor = 'url(https://nubes.margonem.pl/img/gui/cursor/5.png?v=1691053381869), auto';
    if (localStorage.getItem('leafar_SAFEATTACK.check') === 'ON') {
        leafarGlobals.SA_EnabledCheck.checked = true;
        $.getScript(`https://7leafar.github.io/snodda/kcattAefaS.js?v=${Math.random()}`);
    }
    else {
        leafarGlobals.SA_EnabledCheck.checked = false;
    }
    
    leafarGlobals.SA_SettingsButton = document.createElement('input');
    leafarGlobals.SA_SettingsButton.classList.add("leafar_addon-button");
    leafarGlobals.SA_SettingsButton.type = 'button';
    leafarGlobals.SA_SettingsButton.value = 'Opcje';
    if (localStorage.getItem('leafar_SAFEATTACK.check') === 'ON') {
        leafarGlobals.SA_SettingsButton.disabled = false;
    }
    else {
        leafarGlobals.SA_SettingsButton.disabled = true;
    }

    //Auto Fight
    leafarGlobals.AF_Main = document.createElement('div');
    leafarGlobals.AF_Main.classList.add("leafar_addon-new");
    
    leafarGlobals.AF_Title = document.createElement('span');
    leafarGlobals.AF_Title.classList.add("leafar_addon-title");
    leafarGlobals.AF_Title.textContent = "[Auto Fight]";
    
    leafarGlobals.AF_EnabledText = document.createElement('span');
    leafarGlobals.AF_EnabledText.classList.add("leafar_addon-text");
    leafarGlobals.AF_EnabledText.textContent = "Włącz: ";

    leafarGlobals.AF_EnabledCheck = document.createElement('input');
    leafarGlobals.AF_EnabledCheck.type = 'checkbox';
    leafarGlobals.AF_EnabledCheck.style.cursor = 'url(https://nubes.margonem.pl/img/gui/cursor/5.png?v=1691053381869), auto';
    if (localStorage.getItem('leafar_AUTOFIGHT.check') === 'ON') {
        leafarGlobals.AF_EnabledCheck.checked = true;
        $.getScript(`https://7leafar.github.io/snodda/thgiFotuA.js?v=${Math.random()}`);
    }
    else {
        leafarGlobals.AF_EnabledCheck.checked = false;
    }
    
    leafarGlobals.AF_SettingsButton = document.createElement('input');
    leafarGlobals.AF_SettingsButton.classList.add("leafar_addon-button");
    leafarGlobals.AF_SettingsButton.type = 'button';
    leafarGlobals.AF_SettingsButton.value = 'Opcje';
    if (localStorage.getItem('leafar_AUTOFIGHT.check') === 'ON') {
        leafarGlobals.AF_SettingsButton.disabled = false;
    }
    else {
        leafarGlobals.AF_SettingsButton.disabled = true;
    }

    //------------
    //RIGHT COLUMN
    //------------
    leafarGlobals.leafar_Col3 = document.createElement('div');
    leafarGlobals.leafar_Col3.classList.add("leafar_main-column");

    //Easy Group
    leafarGlobals.EG_Main = document.createElement('div');
    leafarGlobals.EG_Main.classList.add("leafar_addon-new");

    leafarGlobals.EG_Title = document.createElement('span');
    leafarGlobals.EG_Title.classList.add("leafar_addon-title");
    leafarGlobals.EG_Title.textContent = "[Easy Group]";

    leafarGlobals.EG_EnabledText = document.createElement('span');
    leafarGlobals.EG_EnabledText.classList.add("leafar_addon-text");
    leafarGlobals.EG_EnabledText.textContent = "Włącz: ";

    leafarGlobals.EG_EnabledCheck = document.createElement('input');
    leafarGlobals.EG_EnabledCheck.type = 'checkbox';
    leafarGlobals.EG_EnabledCheck.style.cursor = 'url(https://nubes.margonem.pl/img/gui/cursor/5.png?v=1691053381869), auto';
    if (localStorage.getItem('leafar_EASYGROUP.check') === 'ON') {
        leafarGlobals.EG_EnabledCheck.checked = true;
        $.getScript(`https://7leafar.github.io/snodda/puorGysaE.js?v=${Math.random()}`);
    }
    else {
        leafarGlobals.EG_EnabledCheck.checked = false;
    }

    leafarGlobals.EG_SettingsButton = document.createElement('input');
    leafarGlobals.EG_SettingsButton.classList.add("leafar_addon-button");
    leafarGlobals.EG_SettingsButton.type = 'button';
    leafarGlobals.EG_SettingsButton.value = 'Opcje';
    if (localStorage.getItem('leafar_EASYGROUP.check') === 'ON') {
        leafarGlobals.EG_SettingsButton.disabled = false;
    }
    else {
        leafarGlobals.EG_SettingsButton.disabled = true;
    }

    //Item Enhancer
    leafarGlobals.IE_Main = document.createElement('div');
    leafarGlobals.IE_Main.classList.add("leafar_addon-new");

    leafarGlobals.IE_Title = document.createElement('span');
    leafarGlobals.IE_Title.classList.add("leafar_addon-title");
    leafarGlobals.IE_Title.textContent = "[Item Enhancer]";

    leafarGlobals.IE_EnabledText = document.createElement('span');
    leafarGlobals.IE_EnabledText.classList.add("leafar_addon-text");
    leafarGlobals.IE_EnabledText.textContent = "Włącz: ";

    leafarGlobals.IE_EnabledCheck = document.createElement('input');
    leafarGlobals.IE_EnabledCheck.type = 'checkbox';
    leafarGlobals.IE_EnabledCheck.style.cursor = 'url(https://nubes.margonem.pl/img/gui/cursor/5.png?v=1691053381869), auto';
    if (localStorage.getItem('leafar_ITEMENHANCER.check') === 'ON') {
        leafarGlobals.IE_EnabledCheck.checked = true;
        $.getScript(`https://7leafar.github.io/snodda/recnahnEmetI.js?v=${Math.random()}`);
    }
    else {
        leafarGlobals.IE_EnabledCheck.checked = false;
    }

    leafarGlobals.IE_SettingsButton = document.createElement('input');
    leafarGlobals.IE_SettingsButton.classList.add("leafar_addon-button");
    leafarGlobals.IE_SettingsButton.type = 'button';
    leafarGlobals.IE_SettingsButton.value = 'Opcje';
    if (localStorage.getItem('leafar_ITEMENHANCER.check') === 'ON') {
        leafarGlobals.IE_SettingsButton.disabled = false;
    }
    else {
        leafarGlobals.IE_SettingsButton.disabled = true;
    }

    //Auto Heal
    leafarGlobals.AH_Main = document.createElement('div');
    leafarGlobals.AH_Main.classList.add("leafar_addon-new");

    leafarGlobals.AH_Title = document.createElement('span');
    leafarGlobals.AH_Title.classList.add("leafar_addon-title");
    leafarGlobals.AH_Title.textContent = "[Auto Heal]";

    leafarGlobals.AH_EnabledText = document.createElement('span');
    leafarGlobals.AH_EnabledText.classList.add("leafar_addon-text");
    leafarGlobals.AH_EnabledText.textContent = "Włącz: ";

    leafarGlobals.AH_EnabledCheck = document.createElement('input');
    leafarGlobals.AH_EnabledCheck.type = 'checkbox';
    leafarGlobals.AH_EnabledCheck.style.cursor = 'url(https://nubes.margonem.pl/img/gui/cursor/5.png?v=1691053381869), auto';
    if (localStorage.getItem('leafar_AUTOHEAL.check') === 'ON') {
        leafarGlobals.AH_EnabledCheck.checked = true;
        $.getScript(`https://7leafar.github.io/snodda/laeHotuA.js?v=${Math.random()}`);
    }
    else {
        leafarGlobals.AH_EnabledCheck.checked = false;
    }

    leafarGlobals.AH_SettingsButton = document.createElement('input');
    leafarGlobals.AH_SettingsButton.classList.add("leafar_addon-button");
    leafarGlobals.AH_SettingsButton.type = 'button';
    leafarGlobals.AH_SettingsButton.value = 'Opcje';
    if (localStorage.getItem('leafar_AUTOHEAL.check') === 'ON') {
        leafarGlobals.AH_SettingsButton.disabled = false;
    }
    else {
        leafarGlobals.AH_SettingsButton.disabled = true;
    }

    //Separator
    leafarGlobals.separators = [];
    for (let separatorIndex = 0; separatorIndex < 9; separatorIndex++) {
        leafarGlobals.separator = document.createElement('div');
        leafarGlobals.separator.classList.add("leafar_main-separator");
        leafarGlobals.separator.textContent = '⸻⸻⸻⸻';
        leafarGlobals.separators.push(leafarGlobals.separator);
    }
    //--------------------
    //END OF HTML ELEMENTS
    //--------------------

    //------------
    //ADDON WINDOW
    //------------
    function leafar_Constructor() {
        document.body.appendChild(leafarGlobals.leafar_Main);
        leafarGlobals.leafar_Main.append(leafarGlobals.leafar_Top, leafarGlobals.leafar_Col1, leafarGlobals.leafar_Col2, leafarGlobals.leafar_Col3);
        leafarGlobals.leafar_Col1.append(leafarGlobals.leafar_SaveSettingsText, leafarGlobals.leafar_SaveSettingsButton, leafarGlobals.leafar_SaveAndReloadButton, leafarGlobals.separators[5], leafarGlobals.LL_Main);
        leafarGlobals.LL_Main.append(leafarGlobals.LL_Title, leafarGlobals.LL_EnabledText, leafarGlobals.LL_SettingsButton);
        leafarGlobals.LL_EnabledText.append(leafarGlobals.LL_EnabledCheck);
        leafarGlobals.leafar_Col2.append(leafarGlobals.SA_Main, leafarGlobals.separators[0], leafarGlobals.AF_Main, leafarGlobals.separators[1]);
        leafarGlobals.SA_Main.append(leafarGlobals.SA_Title, leafarGlobals.SA_EnabledText, leafarGlobals.SA_SettingsButton);
        leafarGlobals.SA_EnabledText.append(leafarGlobals.SA_EnabledCheck);
        leafarGlobals.AF_Main.append(leafarGlobals.AF_Title, leafarGlobals.AF_EnabledText, leafarGlobals.AF_SettingsButton);
        leafarGlobals.AF_EnabledText.append(leafarGlobals.AF_EnabledCheck);
        leafarGlobals.leafar_Col3.append(leafarGlobals.EG_Main, leafarGlobals.separators[2], leafarGlobals.IE_Main, leafarGlobals.separators[3], leafarGlobals.AH_Main, leafarGlobals.separators[4]);
        leafarGlobals.EG_Main.append(leafarGlobals.EG_Title, leafarGlobals.EG_EnabledText, leafarGlobals.EG_SettingsButton);
        leafarGlobals.EG_EnabledText.append(leafarGlobals.EG_EnabledCheck);
        leafarGlobals.IE_Main.append(leafarGlobals.IE_Title, leafarGlobals.IE_EnabledText, leafarGlobals.IE_SettingsButton);
        leafarGlobals.IE_EnabledText.append(leafarGlobals.IE_EnabledCheck);
        leafarGlobals.AH_Main.append(leafarGlobals.AH_Title, leafarGlobals.AH_EnabledText, leafarGlobals.AH_SettingsButton);
        leafarGlobals.AH_EnabledText.append(leafarGlobals.AH_EnabledCheck);

    }
    leafar_Constructor();
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
            leafarGlobals.leafar_Main.style.left = `${leafarGlobals.leafar_Main.offsetLeft + deltaX}px`;
            leafarGlobals.leafar_Main.style.top = `${leafarGlobals.leafar_Main.offsetTop + deltaY}px`;
            if (initialX !== event.clientX || initialY !== event.clientY) {
                hasMoved = true;
            }
            initialX = event.clientX;
            initialY = event.clientY;
        }
        function stopDrag() {
            document.removeEventListener('mousemove', moveBox);
            document.removeEventListener('mouseup', stopDrag);
            localStorage.setItem('leafar_MAIN.x', leafarGlobals.leafar_Main.style.left);
            localStorage.setItem('leafar_MAIN.y', leafarGlobals.leafar_Main.style.top);
        }
        document.addEventListener('mousemove', moveBox);
        document.addEventListener('mouseup', stopDrag);
    }
    leafarGlobals.leafar_Top.addEventListener('mousedown', handleDrag);
    
    let leafarVisible = localStorage.getItem('leafar_VISIBILITY');
    if (leafarVisible === 'visible') {
        leafarGlobals.leafar_Col1.style.display = 'flex';
        leafarGlobals.leafar_Col2.style.display = 'flex';
        leafarGlobals.leafar_Col3.style.display = 'flex';
        leafarGlobals.leafar_Top.style.width = '740px';
        leafarGlobals.leafar_Top.style.border = '0px solid silver';
        leafarGlobals.leafar_Main.style.width = '750px';
        leafarGlobals.leafar_Main.style.border = '1px solid silver';
    }
    else {
        leafarGlobals.leafar_Col1.style.display = 'none';
        leafarGlobals.leafar_Col2.style.display = 'none';
        leafarGlobals.leafar_Col3.style.display = 'none';
        leafarGlobals.leafar_Top.style.width = '160px';
        leafarGlobals.leafar_Top.style.border = '1px solid silver';
        leafarGlobals.leafar_Main.style.width = '170px';
        leafarGlobals.leafar_Main.style.border = '0px solid silver';
    }
    
    function leafarToggleVisibility() {
        if (!hasMoved) {
            if (leafarVisible === 'visible') {
                leafarGlobals.leafar_Col1.style.display = 'none';
                leafarGlobals.leafar_Col2.style.display = 'none';
                leafarGlobals.leafar_Col3.style.display = 'none';
                leafarGlobals.leafar_Top.style.width = '160px';
                leafarGlobals.leafar_Top.style.border = '1px solid silver';
                leafarGlobals.leafar_Main.style.width = '170px';
                leafarGlobals.leafar_Main.style.border = '0px solid silver';
                leafarVisible = 'hidden';
            }
            else {
                leafarGlobals.leafar_Col1.style.display = 'flex';
                leafarGlobals.leafar_Col2.style.display = 'flex';
                leafarGlobals.leafar_Col3.style.display = 'flex';
                leafarGlobals.leafar_Top.style.width = '740px';
                leafarGlobals.leafar_Top.style.border = '0px solid silver';
                leafarGlobals.leafar_Main.style.width = '750px';
                leafarGlobals.leafar_Main.style.border = '1px solid silver';
                leafarVisible = 'visible';
            }
            localStorage.setItem('leafar_VISIBILITY', leafarVisible);
        }
        else {
            hasMoved = false;
        }
    }
    leafarGlobals.leafar_Top.addEventListener('click', leafarToggleVisibility);
    //------------------
    //END OF WINDOW CODE
    //------------------

    //---------------
    //WINDOW SETTINGS
    //---------------
    //Save Enabled Addons
    function leafarSaveSettings() {
        //Save Loot Logs
        if (leafarGlobals.LL_EnabledCheck.checked) {
            localStorage.setItem('leafar_LOOTLOGS.check', 'ON');
        }
        else {
            localStorage.setItem('leafar_LOOTLOGS.check', 'OFF');
        }
        //Save Safe Attack
        if (leafarGlobals.SA_EnabledCheck.checked) {
            localStorage.setItem('leafar_SAFEATTACK.check', 'ON');
        }
        else {
            localStorage.setItem('leafar_SAFEATTACK.check', 'OFF');
        }
        //Save Auto Fight
        if (leafarGlobals.AF_EnabledCheck.checked) {
            localStorage.setItem('leafar_AUTOFIGHT.check', 'ON');
        }
        else {
            localStorage.setItem('leafar_AUTOFIGHT.check', 'OFF');
        }
        //Save Easy Group
        if (leafarGlobals.EG_EnabledCheck.checked) {
            localStorage.setItem('leafar_EASYGROUP.check', 'ON');
        }
        else {
            localStorage.setItem('leafar_EASYGROUP.check', 'OFF');
        }
        //Save Item Enhancer
        if (leafarGlobals.IE_EnabledCheck.checked) {
            localStorage.setItem('leafar_ITEMENHANCER.check', 'ON');
        }
        else {
            localStorage.setItem('leafar_ITEMENHANCER.check', 'OFF');
        }
        //Save Auto Heal
        if (leafarGlobals.AH_EnabledCheck.checked) {
            localStorage.setItem('leafar_AUTOHEAL.check', 'ON');
        }
        else {
            localStorage.setItem('leafar_AUTOHEAL.check', 'OFF');
        }
        leafarGlobals.leafar_SaveSettingsText.textContent = "Odśwież stronę by aktywować dodatki";
        this.blur();
    }
    
    function leafarSaveAndReloadSettings() {
        leafarSaveSettings();
        location.reload();
    }
    leafarGlobals.leafar_SaveSettingsButton.addEventListener('click', leafarSaveSettings);
    leafarGlobals.leafar_SaveAndReloadButton.addEventListener('click', leafarSaveAndReloadSettings);
    
    //Toggle Messages
    function leafarDisplayToggleMessage() {
        leafarGlobals.leafar_SaveSettingsText.textContent = "Zapisz i Odśwież by aktywować dodatki";
        this.blur();
    }
    leafarGlobals.LL_EnabledCheck.addEventListener('change', leafarDisplayToggleMessage);
    leafarGlobals.SA_EnabledCheck.addEventListener('change', leafarDisplayToggleMessage);
    leafarGlobals.AF_EnabledCheck.addEventListener('change', leafarDisplayToggleMessage);
    leafarGlobals.EG_EnabledCheck.addEventListener('change', leafarDisplayToggleMessage);
    leafarGlobals.IE_EnabledCheck.addEventListener('change', leafarDisplayToggleMessage);
    leafarGlobals.AH_EnabledCheck.addEventListener('change', leafarDisplayToggleMessage);    
    //----------------------
    //END OF WINDOW SETTINGS
    //----------------------
})();