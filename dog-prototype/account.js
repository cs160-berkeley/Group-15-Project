import { currentScreen, orangeSkin, yellowSkin, whiteSkin, loadSettings, settingsOverlayScreen} from "main";

var emailIcon = Picture.template($ => ({

var phoneIcon = Picture.template($ => ({

var locationIcon = Picture.template($ => ({
        new EmailLine(),
        new PhoneLine(), 
        new AddressLine(), 
        

var EmailLine = Line.template($ => ({
    left: 0, top: 30, right: 0, height: navBarSize, 
    contents: [
        new emailIcon(),
        new KeyboardField({name: "", hint: "Add your email"})
    ]
}));

var PhoneLine = Line.template($ => ({
    left: 0, top: 10, right: 0, height: navBarSize, 
    contents: [
        new phoneIcon(),
        new KeyboardField({name: "", hint: "Add your phone #"})
    ]
}));

var AddressLine = Line.template($ => ({
    left: 0, top: 10, right: 0, height: navBarSize, 
    contents: [
        new locationIcon(),
        new KeyboardField({name: "", hint: "Add your address"})
    ]
}));