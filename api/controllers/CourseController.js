/**
 * CourseController
 *
 * @description :: Server-side logic for managing courses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getall:(req,res)=>{
        Course.find().then(function(err,courses){
            if(err){
				sails.log(err);
				return ResponseService.json(400, res,"Fetching Courses Failed",err.Errors);
            }
            CourseNote.find({id:courses.id}).then(function(err,notes){
                if(err){
                    sails.log(err);
                    return ResponseService.json(400, res,"Fetching Course Notes Failed",err.Errors);
                }
                courses.notes = notes;
                CourseTeacher.find({id:courses.id}).then(function(err,teachers){
                    if(err){
                        sails.log(err);
                        return ResponseService.json(400, res,"Fetching Course Teachers Failed",err.Errors);
                    }
                    courses.teachers = teachers;
                    var responseData = {
                        courses:courses
                    };
                    return ResponseService.json(200,res,"Success",responseData);
                })
            })
			return ResponseService.json(200,res,"Success",responseData);
        })
    },
    get:(req,res)=>{
        var id = req.body.params;
        Course.find({id:id}).then(function(err,courses){
            if(err){
				sails.log(err);
				return ResponseService.json(400, res,"Fetching Courses Failed",err.Errors);
            }
            CourseNote.find({id:courses.id}).then(function(err,notes){
                if(err){
                    sails.log(err);
                    return ResponseService.json(400, res,"Fetching Course Notes Failed",err.Errors);
                }
                courses.notes = notes;
                CourseTeacher.find({id:courses.id}).then(function(err,teachers){
                    if(err){
                        sails.log(err);
                        return ResponseService.json(400, res,"Fetching Course Teachers Failed",err.Errors);
                    }
                    courses.teachers = teachers;
                    var responseData = {
                        courses:courses
                    };
                    return ResponseService.json(200,res,"Success",responseData);
                })
            })
			return ResponseService.json(200,res,"Success",responseData);
        })
    }
};

