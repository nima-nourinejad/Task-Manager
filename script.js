var button_1_state = 0;
var button_2_state = 0;
var tasks_str = new Array();
var tasks = new Array();


function ft_set_date()
{
	var date = new Date();
	date = date.toLocaleString()
	document.getElementById("date").innerHTML = date;
}
function ft_set_button_1(state)
{
	var button_1 = document.getElementById("button_1");
	if (state == 0)
	{
		button_1.innerHTML = "Add Task";
		button_1_state = 1;
		button_1.onclick = ft_add_task;
	}
	else if (state == 1)
	{
		button_1.innerHTML = "Save Task";
		button_1_state = 0;
		button_1.onclick = ft_save_task;
	}

}
function ft_set_button_2(state)
{
	var button_2 = document.getElementById("button_2");
	if (state == 0)
	{
		button_2.innerHTML = "Show Tasks";
		button_2_state = 1;
		button_2.onclick = ft_print_tasks;
	}
	else if (state == 1)
	{
		button_2.innerHTML = "Hide Tasks";
		button_2_state = 0;
		button_2.onclick = ft_remove_task;
	}

}
function ft_remove_task()
{
	var index = 0;
	var parent = document.getElementById("div_2");
	while (parent.childNodes.length)
		parent.removeChild(parent.childNodes[0]);
	while (tasks.length)
	    tasks.pop();
	ft_set_button_2(button_2_state)
}
function ft_add_task()
{
    var parent = document.getElementById("div_1");
	var title = document.createElement('span');
	title.id = "title";
	title.innerHTML = "New Task : ";
	var input = document.createElement('input');
	input.id = "input";
	input.type = "text";
	parent.appendChild(title);
	parent.appendChild(input);
	ft_set_button_1(button_1_state);
}

function ft_save_task()
{
	other_than_space = /[^\s]/;
	var task = document.getElementById("input").value;
	if (task.length > 0 && other_than_space.test(task))
	{
		parent = document.getElementById("div_1");
		tasks_str.push(task);
		parent.removeChild(document.getElementById("title"));
		parent.removeChild(document.getElementById("input"));
		ft_set_button_1(button_1_state);
	}
}

function ft_print_tasks()
{
	var index = 0;
	var parent = document.getElementById("div_2");
	if (tasks_str.length == 0)
	{
        parent.innerHTML = "No Tasks";
    }
	else
	{
		while (index < tasks_str.length)
		{
			var parent = document.getElementById("div_2");
			var description = document.createElement('span');
			description.innerHTML = tasks_str[index] + '&nbsp;';
			parent.appendChild(description);
			var button = document.createElement("input");
			button.type = "button";
			button.id = index;
			button.value = "Complete";
			button.onclick = function()
			{
				var index = this.id;
				tasks_str.splice(index, 1);
				ft_remove_task();
				ft_print_tasks();				
			}
			parent.appendChild(button);
			var task = {descritption : description, button : button};
			tasks.push(task);
			var br = document.createElement("br");
            parent.appendChild(br);
            index++;
		}
	}
	ft_set_button_2(button_2_state);
	
}

function ft_init()
{
	ft_set_date();
	ft_set_button_1(button_1_state);
	ft_set_button_2(button_2_state);
}
setInterval(ft_set_date, 1000);