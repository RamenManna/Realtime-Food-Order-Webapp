const Menu = require('../../models/menu')
function homeController(){
    return {
        async index (req, res){
            const food = await Menu.find()
            // console.log(food)
            return res.render('home',{food: food})
            // Menu.find().then(function(food){
            //     console.log(food)
            //     return res.render('home',{food: food})

            // })
            
        }
    }
}
module.exports = homeController