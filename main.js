$(document).ready(function () {
    $('#title').autocomplete({
        source: async function(req,res) {
            let data = await fetch(`http://localhost:8000/search?query=${req.term}`)
                    .then(res => res.json())
                    .then(res => res.map(res => {
                        return {
                            label: res.title,
                            value: res.title,
                            id: res._id
                        }
                    }))
                res(data)
                console.log(data)
        },
        minLength: 2,
        select: function(event, ui) {
            console.log(ui.item.id)
            fetch(`http://localhost:8000/get/${ui.item.id}`)
                .then(result => result.json())
                .then(result => {
                    $('#cast').empty()
                    result.cast.forEach(cast =>
                        {
                            $("#cast").append(`<li>${cast}</li>`)
                        })
                        $('img').attr('src',result.poster)
                })
        }
    })
})