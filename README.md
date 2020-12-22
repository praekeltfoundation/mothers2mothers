# mothers2mothers
Scripts that are used for the management of content for mothers2mothers

## Import process
- Run the google sheet script on the sheet containing the content. It times out if you try to do all the sheets at once, so you have to comment out most of the sheets, and do them in batches of ~3 sheets at a time.
- Download the google sheet as an Excel file and name it `who_content.xlsx`, and place it in the same folder as the python script.
- Modify the `ImportInfo` sheet to only contain what you want in the output json file. It will create one file for each Country/Type combination
- Run `pip install -r requirements.txt` to install the requirements of the python script
- Add the token for the Zambia Team line to the local environment. This will be used to do an export, to get the current media information, eg.
```bash
export ZAMBIA_CLIENT_TOKEN=xxx
```
- Run `python convert_to_json.py` to create the output JSON files
- Upload the JSON to Turn, you can use a command similar to:
```bash
curl -X POST "https://whatsapp.turn.io/v1/import" \
     -H "Authorization: Bearer xxx" \
     -H "Content-Type: application/json" \
     -H "Accept: application/vnd.v1+json" \
     -d @content_South_Africa_Client.json
```

## sheet_preperation.js
This script is to be used as a google sheets app script, in order to prepare the sheet. It performs the following actions:
- Copies over English automation keywords to other languages
- Copies over English content to other languages where translations are missing
- Removes skin colour modifiers from emojis. If we use the base emoji without any modifiers as the trigger for the automation, any skin colour will trigger the automation. But if we use a specific skin colour, only that skin colour will trigger the automation
- Adds missing language codes

## convert_to_json.py
This script takes the prepared Excel document from sheet_preperation.js, and outputs JSON in a format that's ready to be uploaded to the Turn import API.
