/**
 * Text Color Plugin
 */
GENTICS.Aloha.TextColor = new GENTICS.Aloha.Plugin('TextColor');

/**
 * Configure the available languages
 */
GENTICS.Aloha.TextColor.languages = ['en', 'ru'];

/**
 * Configure the available colors
 */
GENTICS.Aloha.TextColor.config = {
  colors: [
    'black', 'dimgray', 'gray', 'darkgray', 'lightgray', 'white',
    'red', 'green', 'blue', 'yellowgreen', 'cadetblue', 'coral'
  ]
};

/**
 * Initialize the plugin and set initialize flag on true
 */
GENTICS.Aloha.TextColor.init = function () {	
	
  var that = this,
      buttons = {},
      style = jQuery('<style></style>');
  
  jQuery.each(GENTICS.Aloha.TextColor.config.colors, function(index, value){
    style.append('button.GENTICS_button_'+ value +' { background: '+ value +' !important; } ');
    
    buttons[value] = new GENTICS.Aloha.ui.Button({
      "iconClass" : "GENTICS_button_" + value,
      "size" : "small",
      "onclick": function () {
        
        if (GENTICS.Aloha.activeEditable) {
  				GENTICS.Aloha.activeEditable.obj[0].focus()
  			}
  			var markup = jQuery('<span style="color:' + value + '"></span>');
  			var rangeObject = GENTICS.Aloha.Selection.rangeObject;
  			var foundMarkup = rangeObject.findMarkup(function() {
  				return this.nodeName.toLowerCase() == markup.get(0).nodeName.toLowerCase()
  			},
  			GENTICS.Aloha.activeEditable.obj);  			  			

  			if (foundMarkup) {
  			  jQuery(foundMarkup).css('color', value);  				
  			} else {
  				GENTICS.Utils.Dom.addMarkup(rangeObject, markup)
  			}
  			rangeObject.select();
  			return false
      }
    });
  });
  
  style.appendTo('head');

  // // add it to the floating menu
  // GENTICS.Aloha.FloatingMenu.addButton(
  //   'GENTICS.Aloha.continuoustext',
  //   button,
  //   GENTICS.Aloha.i18n(GENTICS.Aloha, 'floatingmenu.tab.format'),
  //   1
  // );
  
  jQuery.each(GENTICS.Aloha.TextColor.config.colors, function(index, value){
    GENTICS.Aloha.FloatingMenu.addButton(
      "GENTICS.Aloha.continuoustext", 
      buttons[value], 
      'Colour',//that.i18n("floatingmenu.tab.color"), 
      1
    );    
  });
};