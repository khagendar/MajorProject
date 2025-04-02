const express = require("express");
const mongoose = require("mongoose");
const Person = require("../Model/Form");
const Preference=require("../Model/preference")
const router = express.Router();
const PreferenceModel=require("../Model/preference")
class MatchesData {
    constructor() {
        this.getMatches = this.getMatches.bind(this);
        this.calculateCompatibility = this.calculateCompatibility.bind(this);

        this.weights = {
            core: {
                religion: 10,     
                caste: 10,       
                subCaste: 5,      
                motherTongue: 5   
            },
            professional: {
                highestEducation: 10, 
                occupation: 5,        
                annualIncome: 10,      
                workLocation: 5,       
                state: 5,          
                country: 5     
            },
            family: {
                status: 5,       
                type: 5,      
                values: 10    
            },
            personality: {
                mbti: 25,   
                age: 10      
            }
        };
    }

    calculateCompatibility(person1, person2) {
        if (!this.checkCoreCriteria(person1, person2)) {
            return 0;
        }

        let totalScore = 0;

        totalScore += this.calculateCoreCompatibility(person1, person2);
        // console.log("1",totalScore)
        totalScore += this.calculateProfessionalCompatibility(person1, person2);

        // console.log("2",totalScore)
        totalScore += this.calculateFamilyCompatibility(person1, person2);
        // console.log("3",totalScore)

        totalScore += this.calculatePersonalityCompatibility(person1, person2);
        // console.log("4",totalScore)

        return (Math.min(Math.max(totalScore, 0), 125))/1.25;
    }

    checkCoreCriteria(person1, person2) {
        const mandatoryCriteria = [
            { field: 'religion', weight: 1 },
        ];

        return mandatoryCriteria.every(criteria => 
            person1[criteria.field] === person2[criteria.field]
        );
    }

    calculateCoreCompatibility(person1, person2) {
        let coreScore = 0;
        const coreFields = ['religion', 'caste', 'subCaste', 'motherTongue'];

        coreFields.forEach(field => {
            if (person1[field] && person2[field] && person1[field] === person2[field]) {
                coreScore += this.weights.core[field];
            }
        });

        return coreScore;
    }

    calculateProfessionalCompatibility(person1, person2) {
        let professionalScore = 0;
        const professionalFields = [
            'highestEducation', 
            'occupation', 
            'workLocation',
            'state', 
            'country'
        ];
        // console.log("p1", professionalScore)
        professionalFields.forEach(field => {
            const details1 = person1.professionalDetails?.[field];
            const details2 = person2.professionalDetails?.[field];

            if (details1 && details2 && details1 === details2) {
                professionalScore += this.weights.professional[field];
            }
        });
        // console.log("p2", professionalScore)
        const income1 = this.parseIncomeValue(person1.professionalDetails?.annualIncome);
        const income2 = this.parseIncomeValue(person2.professionalDetails?.annualIncome);
        console.log(income1,income2)
        if (income1 && income2) {
            const incomeDifferenceRatio = Math.abs(income1 - income2) / Math.max(income1, income2);
            if (incomeDifferenceRatio < 0.3) {
                professionalScore += this.weights.professional.annualIncome;
            }
        }
        // console.log("p3", professionalScore)
        return professionalScore;
    }

    calculateFamilyCompatibility(person1, person2) {
        let familyScore = 0;
        const familyFields = [
            { field: 'familyStatus', weightField: 'status' },
            { field: 'familyType', weightField: 'type' },
            { field: 'familyValues', weightField: 'values' }
        ];
    
        familyFields.forEach(({ field, weightField }) => {
            console.log(`Checking ${field}:`, 
                'person1:', person1.familyDetails?.[field], 
                'person2:', person2.familyDetails?.[field]
            );
    
            const family1 = person1.familyDetails?.[field];
            const family2 = person2.familyDetails?.[field];
    
            if (family1 && family2 && family1.toLowerCase() === family2.toLowerCase()) {
                const weight = this.weights.family[weightField];
                console.log(`Match found for ${field}, adding weight:`, weight);
                familyScore += weight;
            }
        });
    
        console.log("Final family compatibility score:", familyScore);
        return familyScore;
    }

    calculatePersonalityCompatibility(person1, person2) {
        let personalityScore = 0;

        if (person1.Mbti?.res && person2.Mbti?.res) {
            const mbtiScore = this.calculateMbtiCompatibility(person1.Mbti, person2.Mbti);
            personalityScore += (mbtiScore * this.weights.personality.mbti) / 100;
        }

        const age1 = parseInt(person1.age);
        const age2 = parseInt(person2.age);
        
        if (age1 && age2 && Math.abs(age1 - age2) <= 5) {
            personalityScore += this.weights.personality.age;
        }

        return personalityScore;
    }

    calculateMbtiCompatibility(mbti1, mbti2) {
        const compatibilityMatrix = {
            highCompatibility: {
                "INFJ": ["ENFP", "ENTP", "INFJ", "INFP", "ENFJ"],
                "INTJ": ["ENFP", "ENTP", "INTJ", "INTP", "ENTJ"],
                "ENFP": ["INFJ", "INTJ", "ENFP", "INFP"],
                "INFP": ["ENFJ", "INFJ", "ENFP", "INTP"]
            },
            moderateCompatibility: {
                "INTP": ["ENTJ", "ENTP"],
                "ENTP": ["INTJ", "INTP"],
                "ENTJ": ["INTP", "ENTP"]
            }
        };

        const type1 = mbti1.res;
        const type2 = mbti2.res;

        if (type1 === type2) return 100;

        if (compatibilityMatrix.highCompatibility[type1]?.includes(type2) || 
            compatibilityMatrix.highCompatibility[type2]?.includes(type1)) {
            return 80;
        }

        if (compatibilityMatrix.moderateCompatibility[type1]?.includes(type2) || 
            compatibilityMatrix.moderateCompatibility[type2]?.includes(type1)) {
            return 60;
        }

        return 40;
    }

    parseIncomeValue(incomeString) {
        if (!incomeString) return null;
        const numbers = incomeString.match(/\d+/g);
        if (!numbers?.length) return null;
        return numbers.length === 1 
            ? parseInt(numbers[0]) 
            : (parseInt(numbers[0]) + parseInt(numbers[1])) / 2;
    }

    async comparePreference(user1,user2){
        const preference= await PreferenceModel.findOne({ userId: user1 });
        if (!preference) {
            return res.status(404).json({ message: "Preferences not found" });
        }
        const userdetails=await Person.findOne({userId : user2});

        const {ageRange,gender,religion,caste,subcaste,motherTongue,eatingHabits,education,employed,occupation,annualIncome,location,height,maritalStatus,familyStatus,familyType,familyValues,physicalStatus }=preference;
        const userdets={
            age:userdetails.age,
            gender:userdetails.gender,
            religion:userdetails.religion,
            caste: userdetails.caste,
            subCaste: userdetails.subCaste ,
            motherTongue: userdetails.motherTongue,
            eatingHabits:userdetails.eatingHabits,               
            highestEducation: userdetails.professionalDetails.highestEducation,
            employed:userdetails.professionalDetails.employed,
            occupation:userdetails.professionalDetails.occupation,
            annualIncome:userdetails.professionalDetails.annualIncome,
            state: userdetails.professionalDetails.state,
            maritalStatus: userdetails.familyDetails.maritalStatus,
            height: {
                feet: userdetails.familyDetails.height.feet,
                inches:userdetails.familyDetails.height.inches,
            },
            familyStatus:userdetails.familyDetails.familyStatus,
            familyType:userdetails.familyDetails.familyType,
            familyValues:userdetails.familyDetails.familyValues,
            anyDisability:userdetails.familyDetails.anyDisability,
        };
        const matches=[
            {label:"Prefered Age",  value: `${ageRange[0]},${ageRange[1]}`   ,  match:"red"}, //0
            {label:"Prefered gender" ,  value:  gender? gender.split(",") : "Any".split(",") ,   match:"red"}, //1
            {label:"Prefered religion",  value:  religion   ,   match:"red" }, //2
            {label:"Prefered caste" ,  value: caste.split(",")   , match:"red"},   //3
            {label:"Prefered subCaste" ,  value:  subcaste.split(",")    ,  match:"red"},  //4
            {label:"Prefered motherTongue" ,  value:  motherTongue   ,  match:"red"},   //5
            {label:"Prefered eatingHabits"  ,  value: eatingHabits   ,  match:"red" },  //6
            {label:"Prefered highestEducation",  value:  education   ,  match:"red"  }, //7
            {label:"Prefered employed" ,  value:  employed   ,  match:"red" },  //8
            {label:"Prefered occupation"  ,  value:  occupation    ,  match:"red" },    //9
            {label:"Prefered annualIncome" ,  value:  annualIncome   ,  match:"red" },  //10
            {label:"Prefered state" ,  value: location    ,  match:"red"},  //11
            {label:"Prefered maritalStatus",  value:  maritalStatus    ,  match:""},    //12
            {label:"Prefered height"  ,  value:  `${height[0].feet}ft ${height[0].inches}in , ${height[1].feet}ft ${height[1].inches}in`,  match:"red"}, //13
            {label:"Prefered familyStatus" ,  value:  familyStatus    ,  match:"red"}, //14
            {label:"Prefered familyType"   ,  value:  familyType   ,  match:"red" }, //15
            {label:"Prefered familyValues" ,  value:   familyValues   ,  match:"red"},  //16
            {label:"Prefered physical state"  ,  value:   physicalStatus    ,  match:"red"}, //17

        ];
        
        const arr=[userdets.age,userdets.gender,userdets.religion,userdets.caste,userdets.subCaste,userdets.motherTongue,userdets.eatingHabits,userdets.highestEducation,userdets.employed,userdets.occupation,userdets.annualIncome,userdets.state,userdets.maritalStatus,userdets.height,userdets.familyStatus,userdets.familyType,userdets.familyValues,userdets.anyDisability]
        
        if(Number.parseInt(userdets.age)<=ageRange[1] && Number.parseInt(userdets.age)>=ageRange[0]){
            matches[0].match="green";
        }

        const userTotalInches = userdets.height.feet * 12 + userdets.height.inches;
        const minTotalInches = height[0].feet * 12 + height[0].inches;
        const maxTotalInches = height[1].feet * 12 + height[1].inches;
        // console.log(userTotalInches,minTotalInches,maxTotalInches)
        if(userTotalInches >= minTotalInches && userTotalInches <= maxTotalInches){
            matches[13].match="green";
            // console.log(matches[14].match)
        }
        console.log("Gender")
        console.log(matches)
        console.log("user",userdets.gender)
        console.log("gen",gender)
        if((userdets.gender==="Male"&&matches[1].value[0]==="Groom")||(userdets.gender==="Female"&&matches[1].value[0]==="Bride")||matches[1].value.includes("Any")){
            console.log("Gender")
            matches[1].match="green";
            console.log(matches)
        }

        let count=0; 
        matches.forEach(match => {
            if (match.label !== "Preferred Age" && match.label !== "Preferred Height" && match.label !=="Prefered gender" && match.label!=="Prefered annualIncome") {
                const { value, userValue } = match;
                
                if (Array.isArray(value)) {
                    console.log("value",arr[count]);
                    if(value.includes("Any")||value.includes(arr[count])){
                        
                        match.match="green"
                    }
                    else{
                        match.match="red"
                    }
                    console.log(match.label,count)
                } 
            }
            count++;
        });
        const income=["Less than Rs.50 thousand", "Rs.50 thousand", "Rs.1 Lakh", "Rs.2 Lakhs", "Rs.3 Lakhs", "Rs.4 Lakhs", "Rs.5 Lakhs", "Rs.6 Lakhs", "Rs.7 Lakhs", "Rs.8 Lakhs", "Rs.9 Lakhs", "Rs.10 Lakhs", "Rs.12 Lakhs", "Rs.14 Lakhs", "Rs.16 Lakhs", "Rs.18 Lakhs", "Rs.20 Lakhs", "Rs.25 Lakhs", "Rs.30 Lakhs", "Rs.35 Lakhs", "Rs.40 Lakhs", "Rs.45 Lakhs", "Rs.50 Lakhs", "Rs.60 Lakhs", "Rs.70 Lakhs", "Rs.80 Lakhs", "Rs.90 Lakhs", "Rs.1 Crore", "Rs.1 Crore & Above"]; 
        // console.log(annualIncome)
        const income1 = income.indexOf(annualIncome[0]);
        const income2 = income.indexOf(userdets.annualIncome);
        console.log("income",income1,income2)
        if(income1 <= income2){
            matches[10].match="green";
        }

        let number=0;
        matches.forEach(match => {
            if(match.match==="green"){
                number++;
            }
        });
        if(number>=18*0.7){
            return 1;
        }
        else{
            return 0;
        }
    }

    async getMatches(req, res) {
        try {
            const userId = req.params.userId;
            console.log("id", userId);

            const person = await Person.findOne({ userId });
            if (!person) {
                return res.status(404).json({ message: "Profile not found" });
            }

            const personAge = parseInt(person.age);
            const minAgeMatch = personAge - 5;
            const maxAgeMatch = personAge + 5;
            const oppositeGender = person.gender === "Male" ? "Female" : "Male";

            const potentialMatches = await Person.find({
                gender: oppositeGender,
                age: { $gte: minAgeMatch, $lte: maxAgeMatch },
            }).populate('userId', 'email isVerified');

            const potentialMatches1 = potentialMatches.filter(match => this.comparePreference(userId,match.userId));

            const scoredMatches = potentialMatches1.map(match => {
                const compatibilityScore = this.calculateCompatibility(person, match);
                return {
                    person: match,
                    score: compatibilityScore
                };
            });
            // console.log("scoredmatches",scoredMatches)
            scoredMatches.sort((a, b) => b.score - a.score);
            const validMatches = scoredMatches.filter(match => match.score > 0);

            const formattedMatches = validMatches.map(match => ({
                userId: match.person.userId._id,
                _id: match.person._id,
                name: match.person.name,
                age: match.person.age,
                religion: match.person.religion,
                caste: match.person.caste,
                motherTongue: match.person.motherTongue,
                image: match.person.image,
                bio: match.person.bio,
                professionalDetails: match.person.professionalDetails,
                familyDetails: {
                    maritalStatus: match.person.familyDetails.maritalStatus,
                    height: match.person.familyDetails.height,
                    familyType: match.person.familyDetails.familyType
                },
                mbtiType: match.person.Mbti?.res,
                compatibilityScore: Math.round(match.score),
            }));
            console.log(formattedMatches)

            res.status(200).json({ success: true, data: formattedMatches });

        } catch (error) {
            console.error("Error finding matches:", error);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }
}

module.exports = new MatchesData();
