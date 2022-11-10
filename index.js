fetch("https://reqres.in/api/users/")
    .then(res => {
        if (res.ok){
            console.log("Success")
        }else {
            console.log("Not successful")
        }
        res.json()
    })
    .then(data => console.log(data))
    .catch(error => console.log(error))

    // fetch from API 