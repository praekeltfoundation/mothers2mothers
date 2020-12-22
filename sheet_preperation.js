function copyAppend() {
  
  /**
  * This script does the following:
  * Copies over automation keywords from the English sheet to all the other languages
  * Copies over English content to other sheets ONLY if the content row there is blank
  * Validate emojis
  * Note: Not all content is ready yet so there's a disclaimer which lets user know that English content will be used as placeholders for content that isn't ready in other non-English languages
  * Validates the sheet for errors such as empty language fields etc
  * Validates emojis by replacing any skin tone modifier with the default modifier
  * For English and Sepedi, we only need to run the EngSepedi function to validate content and emoji
*/

    /* SA languages 
  	EngSepedi("English master");/*
	replaceWithEnglish("Xitsonga (SA)");
	replaceWithEnglish("TshiVenda (SA)");
    replaceWithEnglish("Siswati (SA)");
    replaceWithEnglish("Setswana (SA)");
    replaceWithEnglish("Sesotho (SA)");
	replaceWithEnglish("isiZulu (SA)");
	replaceWithEnglish("isiXhosa (SA)");
	replaceWithEnglish("Afrikaans (SA)");
	EngSepedi("Sepedi (SA)");
	replaceWithEnglish("Ndebele (SA)");
    

    /* Non-SA languages 
	replaceWithEnglish("Sesotho (Lesotho)");
  replaceWithEnglish("Nyanja (Malawi)");
  replaceWithEnglish("Lomwe (Malawi)");
	replaceWithEnglish("Chichewa (Malawi)");
  replaceWithEnglish("Lusoga (Uganda)");
	replaceWithEnglish("Luganda (Uganda)");
	replaceWithEnglish("Gikuyu (Kenya)");
	replaceWithEnglish("Kiswahili (Kenya)");
  replaceWithEnglish("Dholuo (Kenya)");

	replaceWithEnglish("Twi (Ghana)");
	replaceWithEnglish("Dangme (Ghana)");
  replaceWithEnglish("Bemba (Zambia)");*/
	replaceWithEnglish("Ronga (Mozambique)");
	replaceWithEnglish("Changana (Mozambique)");
	replaceWithEnglish("Makhuwa (Mozambique)");
  /**
  * For production uncomment the functions below and run them 
  * Portuguese (Mozambique) and Portuguese (Angola)
  * Also comment out replaceWithEnglish("Portuguese (Mozambique_Angola)") since it's for sandbox only
  * Portuguese ANgola and Mozambique Angola have the same content so we use a single sheet for sandbox
  * Whereas on the live line it's two different lines so we separate them
  */
	replaceWithEnglish("Portuguese (Mozambique)");
	//replaceWithEnglish("Portuguese (Angola)");
  
  
   /**
  * For sandbox uncomment the function below and run it 
  * replaceWithEnglish("Portuguese (Mozambique_Angola)")
  * Also comment out replaceWithEnglish("Portuguese (Mozambique)") and replaceWithEnglish("Portuguese (Angola)") since it's for prod only
  
  replaceWithEnglish("Portuguese (Mozambique_Angola)")
  
	replaceWithEnglish("Umbundu (Angola)");
	replaceWithEnglish("Kimbundu (Angola)");*/
	Logger.clear();
}

function EngSepedi(sheetname) {
	var app = SpreadsheetApp;
	var sheet = app.getActiveSpreadsheet().getSheetByName(sheetname);
	var lastrow = sheet.getLastRow();
	var cellLanguage, keywordArr, output, newKeyword;

	for (var i = 1; i <= lastrow; i++) {
		cellLanguage = sheet.getRange(i, 3).getValue();
		keywordArr = sheet.getRange(i, 4).getValue();
		//get keywords and emojis
		keywordArr = sheet.getRange(i, 4).getValue()
		//convert to string
		keywordArr = keywordArr.toString();
		//put in a list
		keywordArr = keywordArr.split(',');
		for (var j = 0; j < keywordArr.length; j++) {
			if (isEmoji(keywordArr[j]) == true) {
				keywordArr[j] = replaceModifier(keywordArr[j], '')
			} else {}
			output = keywordArr;
			newKeyword = output.join(",");
			//replace row with new value
			sheet.getRange(i, 4).setValue(newKeyword)
		}
		if (cellLanguage == "") {
			Language = sheet.getRange(i - 1, 3).getValue();
			sheet.getRange(i, 3).setValue(Language)
		} else {}
	}

}

function replaceWithEnglish(sheetname) {
	var app = SpreadsheetApp;
	var English = app.getActiveSpreadsheet().getSheetByName("English master");
	var sheet = app.getActiveSpreadsheet().getSheetByName(sheetname);
	var lastrow = sheet.getLastRow();
	var cell, cellEnglish, cellEnglishAutomation, cellNonEnglishAutomation, cellLanguage, Language, keywordArr, output, newKeyword, newArr;

	for (var i = 1; i <= lastrow; i++) {
		cell = sheet.getRange(i, 2).getValue();
		cellLanguage = sheet.getRange(i, 3).getValue();
		if (cell != "") {

			//get keywords and emojis
			keywordArr = sheet.getRange(i, 4).getValue()
			//convert to string
			keywordArr = keywordArr.toString();
			//put in a list
			keywordArr = keywordArr.split(',');
			for (var j = 0; j < keywordArr.length; j++) {
				if (isEmoji(keywordArr[j]) == true) {
					keywordArr[j] = replaceModifier(keywordArr[j], '')
				} else {}
				output = keywordArr;
				newKeyword = output.join(",");
				//replace row with new value
				sheet.getRange(i, 4).setValue(newKeyword)

				//get automation from non-English sheet
				cellNonEnglishAutomation = sheet.getRange(i, 4).getValue();
                cellNonEnglishAutomation = cellNonEnglishAutomation.toString();
                cellNonEnglishAutomation = cellNonEnglishAutomation.split(", ");
                
				//get automation from English
				cellEnglishAutomation = English.getRange(i, 4).getValue();
                cellEnglishAutomation = cellEnglishAutomation.toString();
                cellEnglishAutomation = cellEnglishAutomation.split(", ");
              
                //Do a set difference so we get only English keywords that are not in the current field
                newArr = cellEnglishAutomation.filter(f => !cellNonEnglishAutomation.includes(f));
                newArr = newArr.join(", ");
                cellEnglishAutomation = cellEnglishAutomation.join(", ");
                cellNonEnglishAutomation = cellNonEnglishAutomation.join(", ");

				if (newArr != "") {
					sheet.getRange(i, 4).setValue(cellNonEnglishAutomation + ", " + newArr)
				} else {}


			}
		} else {}
		if (cell == "") {

			//modify and replace keyword with new emoji first
			keywordArr = sheet.getRange(i, 4).getValue();
			//convert to string
			keywordArr = keywordArr.toString();
            //put in a list
			keywordArr = keywordArr.split(',');
			for (var j = 0; j < keywordArr.length; j++) {
				if (isEmoji(keywordArr[j]) == true) {
					keywordArr[j] = replaceModifier(keywordArr[j], '')
				} else {}
				output = keywordArr;
				newKeyword = output.join(",");
				//replace row with new value
				sheet.getRange(i, 4).setValue(newKeyword)
			}
			//get  content from English sheet
			cellEnglish = English.getRange(i, 2).getValue();
          

			//get automation from non-English sheet
		    cellNonEnglishAutomation = sheet.getRange(i, 4).getValue();
            cellNonEnglishAutomation = cellNonEnglishAutomation.toString();
            cellNonEnglishAutomation = cellNonEnglishAutomation.split(", ");
                
		    //get automation from English
			cellEnglishAutomation = English.getRange(i, 4).getValue();
            cellEnglishAutomation = cellEnglishAutomation.toString();
            cellEnglishAutomation = cellEnglishAutomation.split(", ");
          
            //Do a set difference so we get only English keywords that are not in the current field
            newArr = cellEnglishAutomation.filter(f => !cellNonEnglishAutomation.includes(f));
            newArr = newArr.join(", ");
            cellEnglishAutomation = cellEnglishAutomation.join(", ");
            cellNonEnglishAutomation = cellNonEnglishAutomation.join(", ");
          
			//add content an automation to non-English sheet
			sheet.getRange(i, 2).setValue(cellEnglish);

			//Check that the English cell is not empty before attempting to append
			if (newArr != "") {
				sheet.getRange(i, 4).setValue(cellNonEnglishAutomation + ", " + newArr)
			} else {}

		} else {}
		if (cellLanguage == "") {
			Language = sheet.getRange(i - 1, 3).getValue();
			sheet.getRange(i, 3).setValue(Language)
		} else {}
	}
	return 0;
}


// replaces any skin tone modifiers with the default modifier
function replaceModifier(emoji, modifier) {
	// modifiers for skin tones
	const modifiers = [
		'\u{1f3fb}', // skin type 1-2
		'\u{1f3fc}', // skin type 3
		'\u{1f3fd}', // skin type 4
		'\u{1f3fe}', // skin type 5
		'\u{1f3ff}', // skin type 6
	];
	let ret = emoji;
	for (let i = 0; i < modifiers.length; i++) {
		ret = `${ret}`.split(modifiers[i]).join(modifier || '');
	}
	return ret;
}

//checks if it's an emoji
function isEmoji(str) {
	var ranges = [
		'(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])' // U+1F680 to U+1F6FF
	];
	if (str.match(ranges.join('|'))) {
		return true;
	} else {
		return false;
	}
}
