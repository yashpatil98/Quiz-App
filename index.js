


$.get("https://5d76bf96515d1a0014085cf9.mockapi.io/quiz", function(e) {
    
    var inputArr = []; //to store created input elements
    var labelArr = []; //to store created label elements
    var answer; // to store filtered array of api correct responses
    var answerText = []; //to store array of correct responses
    var count = 0; //to store the correct answers marks
    
    var h1 = $("<h1>").html("The Quiz App"); //heading declared
    var form = $("<form>"); //form made
    $("body").append(h1, form);

    var response = []; //to store the backend data
    response = e;

    for(var i = 0; i < response.length; i++) {

        var h2 = $("<h2>").html("Q" + (i + 1) + "." + response[i].question); //creating questions
        var section = $("<section>").html(h2); //storing in each sections
        $(section).append(h2);

        var code = response[i].answer; //to store the different only one answer count after each iteration


        for(var j = 0; j < response[i].options.length; j++) {

            var input = $("<input>"); //input and label are created
            //a different sets of questions are made in attribute "name" so that only one radio will be clicked and
            //only one value will be used that will be checked associate with the question
            //the "id" and "value" of input should be same with "for" of label
            $(input).attr({"name":"Question" + [i], "type":"radio", "id":response[i].options[j] + j, "value":response[i].options[j]});
            var label = $("<label>").text(response[i].options[j]);
            $(label).attr("for",response[i].options[j] + j);
            var br = $("<br>");
            $(section).append(input, label, br);

            labelArr.push($(label)); //to stre created inputs and labels
            inputArr.push($(input));
            answerText.push(response[i].options[code - 1]); //this iterates through the options to get the correct answer
            code = 0; // again set to zero so that it will not repeat previous value. 
        }

        var hr = $("<hr>");
        $(section).append(hr);
        $(form).append(section); //finally sections are put in forms
    }

    var submit = $("<input>"); //submit event works only for forms
    $(submit).attr({"type":"submit", "class":"submit"});
    $(form).append(submit);

    answer = answerText.filter(v => v !== undefined); //used to filter out the undefined values got from previous iteration
    
    var inputAnswer = []; //to store checked (clicked) values of input and label
    var inputLabel = [];
    var submitCount = 0; //to prevent clicking submit more than once

    $(form).submit(function(e){
        e.preventDefault();
        submitCount++;
        if(submitCount > 1) {
            return;
        }
        //returns if clicked more than once

        for(var k = 0; k < inputArr.length; k++) { //iterates to store the clicked values
            if(inputArr[k][0].checked === true) {
                inputAnswer.push(inputArr[k][0]);
            }
        }
        for (var x = 0; x < answer.length; x++) { //to check the input values with the correct answers and the marks is counted (count)
            if(answer[x] === inputAnswer[x].value) {
                count++;
            }
            for(var w = 0; w < labelArr.length; w++) { //to mark right after all correct answers and labels
                if(labelArr[w][0].innerHTML === answer[x]) {
                    var right = $("<i>").attr("class", "fas fa-check");
                    $(right).attr("id","right");
                    $(labelArr[w][0]).append(right);
                }
            }
        }
        for (var y = 0; y < labelArr.length; y++) { //here the id of input and for of label is matched for the correct selection of labels
            for(var t = 0; t < inputAnswer.length; t++) {
                if(labelArr[y][0].htmlFor === inputAnswer[t].id) {
                    inputLabel.push(labelArr[y][0]);
                }
            }
        }
        for(var z = 0; z < inputLabel.length; z++) { //to mark wrong on the input answers
            if(inputLabel[z].innerText !== answer[z]) {
                var wrong = $("<i>").attr("class", "fas fa-times");
                $(wrong).attr("id","wrong");
                $(inputLabel[z]).append(wrong);
            }
        }
        $(score).html("Score: " + count + "/5"); //changes only on event
    })
    var score = $("<p>").html("Score: " + count + "/5"); //created default to change on event
    var aside = $("<aside>").html(score);
    $("body").prepend(aside);
    submitCount = 0; // set to 0 after event completion
});