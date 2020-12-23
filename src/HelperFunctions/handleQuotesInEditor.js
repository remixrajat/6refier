export var handleQuotesInEditor = (contentState)  => {
    for(let i=0; i < contentState.blocks.length;i++){
            let blockText = contentState.blocks[i].text;
            // blockText = blockText.replace(/'/g, "’").replace(/"/g, "“");
            // blockText = blockText.replace(/'/g, "\\'").replace(/"/g, "\\\"");
            while(blockText.indexOf('"') > -1){
                blockText = blockText.replace(/"/, "“");
                blockText = blockText.replace(/"/, "”");
            }

            while(blockText.indexOf("'") > -1){
                let index = blockText.indexOf("'");
                if(index != 0){
                    if(blockText.charAt(index -1) != " "){
                        blockText = blockText.replace(/'/,"’");
                    }
                    else{
                        blockText = blockText.replace(/'/,"`");
                    }
                }
                else{
                    blockText = blockText.replace(/'/,"`");
                }
            }
            
            contentState.blocks[i].text = blockText;
        }
    return contentState;
}