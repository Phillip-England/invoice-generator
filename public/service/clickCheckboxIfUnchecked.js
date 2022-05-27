clickCheckboxIfUnchecked = (target) => {
    if (target.checked == true){
        //do nothing
    } else {
       if (target.checked == false){
           target.click()
       }
    }
}