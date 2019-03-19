// GeoJSON Feature Collection
function FeatureCollection(){
    this.type = 'FeatureCollection';
    this.features = new Array();
}

router.get('/', function(req, res, next) {
    
    const query = questionModel.find().sort({'idquestion': 'asc'});;                           
                             

    query.exec(function(err, questions){
        if (err){
            res.send(err); 
        }
        var featureCollection = new FeatureCollection();
        questions.forEach(element => {
            featureCollection.features[i] = JSON.parse(element);
        });
        
        
        res.json(questions);  
    });
   
});