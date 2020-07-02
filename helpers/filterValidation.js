

module.exports = {

    common: (value) => {
        return value.replace(/[^0-9a-zA-Z-,-.]/g,'');
    },
    numbers: (value) => {        
        return value.replace(/[^0-9-,-.]/g,'');
    },
    letters: (value) => {
        return value.replace(/[^a-zA-Z záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ_]/g, '')
    },

    isEmpty: (obj) => {
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop))
                return false;
        }
    
        return true;
    },

    isEmptyString: (value) => {
        if(value != undefined) {
            if(value.trim().length > 0) {
                return false;
            }
        }

        return true;
    },

    hasRecords: (value) => {
        return value.length > 0
    }

}