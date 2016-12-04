import { currentScreen, orangeSkin, yellowSkin, whiteSkin, loadSettings, loadAccount,
settingsOverlayScreen, borderedSkin,
		accountName, accountEmail, accountPhone, accountAddress} from "main";import { SettingsOverlay } from "settingsoverlay"; import KEYBOARD from './keyboard';import {    FieldScrollerBehavior,     FieldLabelBehavior} from './field';

import { 
    Button,
    ButtonBehavior 
} from 'buttons';var titleScreenStyle = new Style({font: 'bold 60px', color: 'blue'});var titleStyle = new Style({font: '26px', color: 'black'});var labelStyle = new Style({font: '20px', fill: "black", horizontal: "left"});let nameInputSkin = new Skin({ borders: { left: 2, right: 2, top: 2, bottom: 2 }, stroke: 'gray' });let fieldStyle = new Style({ color: 'black', font: 'bold 24px', horizontal: 'left',    vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5 });let fieldHintStyle = new Style({ color: '#aaa', font: '24px', horizontal: 'left',    vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5 });let fieldLabelSkin = new Skin({ fill: ['transparent', 'transparent', '#C0C0C0', '#acd473'] });
let small = new Style({ font: "20px", color: "black" });var accountImage = Picture.template($ => ({   top: 10, height: 80, url: "assets/accountIcons.png",}));

var emailIcon = Picture.template($ => ({   height: 40, right: 0, left: 0, url: "assets/emailIcon.png",}));

var phoneIcon = Picture.template($ => ({   height: 40, right: 5, left: 8, url: "assets/phoneIcon.png",}));

var locationIcon = Picture.template($ => ({   height: 40, right: 7, left: 10, url: "assets/locationIcon.png",}));var AccountColumn = Column.template($=>({    left: 8, right: 8, top: 20, bottom: 30, skin: whiteSkin,    contents: [        new accountImage(),        new KeyboardField({name: accountName, hint: "Tap to add your name", content: "name"}), 
        new EmailLine(),
        new PhoneLine(), 
        new AddressLine(), 
        new buttonTemplate({string: "Clear Account"})
            ],    Behavior: class extends Behavior {        onTouchEnded(content) {            SystemKeyboard.hide();            content.focus();        }    }}));

var EmailLine = Line.template($ => ({
    left: 0, top: 30, right: 0, height: navBarSize, 
    contents: [
        new emailIcon(),
        new KeyboardField({name: accountEmail, hint: "Add your email", content: "email"})
    ]
}));

var PhoneLine = Line.template($ => ({
    left: 0, top: 10, right: 0, height: navBarSize, 
    contents: [
        new phoneIcon(),
        new KeyboardField({name: accountPhone, hint: "Add your phone #", content: "phone"})
    ]
}));

var AddressLine = Line.template($ => ({
    left: 0, top: 10, right: 0, height: navBarSize, 
    contents: [
        new locationIcon(),
        new KeyboardField({name: accountAddress, hint: "Add your address", content: "address"})
    ]
}));let KeyboardField = Container.template($ => ({     width: 240, height: 36, right: 10, left: 10, skin: nameInputSkin, contents: [        Scroller($, {             left: 4, right: 4, top: 4, bottom: 4, active: true,             Behavior: FieldScrollerBehavior, clip: true,             contents: [                Label($, {                     left: 0, top: 0, bottom: 0, skin: fieldLabelSkin,                     style: fieldStyle, anchor: 'NAME',                    editable: true, string: $.name,                    Behavior: class extends FieldLabelBehavior {                        onEdited(label) {                            let data = this.data;                            data.name = label.string;                            label.container.hint.visible = (data.name.length == 0);
                            if (data.content == "name") {
                            	accountName = data.name; 
                            } else if (data.content == "email") {
                            	accountEmail = data.name; 
                            } else if (data.content == "phone") {
                            	accountPhone = data.name; 
                            } else if (data.content == "address") {
                            	accountAddress = data.name; 
                            }                        }                    },                }),                Label($, {                    left: 4, right: 4, top: 4, bottom: 4, style: fieldHintStyle,                    string: $.hint, name: "hint"                }),            ]        })    ]}));

let buttonTemplate = Button.template($ => ({
    top: 50, bottom: 50, left: 20, right: 20,  skin: borderedSkin,
    contents: [
        new Label({left: 0, right: 0, string: $.string, style: small})
    ],
    Behavior: class extends ButtonBehavior {
        onTap(button){
            accountName = ""; 
            accountEmail = ""; 
            accountPhone = ""; 
            accountAddress = ""; 
            saveJson(); 
            loadAccount(); 
        }
    }
}));//Will need to use as part of the template on most screensvar settingsIcon = Picture.template($ => ({    left: 5, height: 20, url: "assets/settings.png", active: true,     Behavior: class extends Behavior {        onTouchEnded(container) {
        	//save account Json
        	saveJson();             settingsOverlayScreen = new SettingsOverlay();             application.add(settingsOverlayScreen);          }    }}));

function saveJson(){
    var uriAccountDirectory = mergeURI(Files.preferencesDirectory, application.di + ".account/");    // Clear out the "/account/" directory.    if (Files.exists(uriAccountDirectory)){         Files.deleteDirectory(uriAccountDirectory, true);      }
     Files.ensureDirectory(uriAccountDirectory);
     var uriAccountFile = mergeURI(Files.preferencesDirectory, application.di + ".account/account.json"); 
     var account = { name: accountName, 
      	 email: accountEmail, 
     	 phone: accountPhone, 
         address: accountAddress       };
       Files.writeJSON(uriAccountFile, account); 
}var backIcon = Picture.template($ => ({    left: 10, height: 20, url: "assets/backButton.png", active: true,    Behavior: class extends Behavior {        onTouchEnded(container) {
        	// SAVE JSONS
        	saveJson();             // MOVE TO PREVIOUS SCREEN HERE            loadSettings();        }    }}));var accountText = Picture.template($ => ({    left: 50, height: 20, url: "assets/accountText.png"}));// Templatesvar navBarSize = 40;var NavTop = Line.template($ => ({    left: 0, top: 0, right: 0, height: navBarSize, skin: orangeSkin,    contents: [        new settingsIcon(),        new accountText()    ]}));var NavBot = Line.template($ => ({    left: 0, bottom: 0, right: 0, height: navBarSize, skin: orangeSkin,    contents: [        new backIcon()    ]}));// Screensexport var AccountScreen = Column.template($ => ({    left: 0, right: 0, top: 0, bottom: 0, skin: yellowSkin, active: true,     contents: [        new NavTop(),        new AccountColumn(),         new NavBot(),    ],     Behavior: class extends Behavior {        onTouchEnded(content) {            KEYBOARD.hide();            content.focus();        }    }}));