async function createNew(event) {
    event.preventDefault();

    try {
        const inputEl = document.getElementById("createInput");
        const textareaEl = document.getElementById("textarea");

        const input = inputEl.value;
        const textarea = textareaEl.value;

        const url = "https://00018993-production.up.railway.app";

        const response = await fetch(`${url}/dashboard/create-goal`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                goalName: input,
                description: textarea,
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(`Failed to create a user: ${response.status} ${response.statusText}`);
        } else {
            alert("Goal created successfully!");
            console.log("Server Response:", data);
        }

        inputEl.value = "";
        textareaEl.value = "";

        getAll();
    } catch (error) {
        console.error(error);
    }
}

let areGoalsVisible = false;
async function getAll() {
    try {
        const ul = document.getElementById("ul");
        const url = "http://localhost:5000";

        const response = await fetch(`${url}/dashboard/read-goals`, {
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch users: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        ul.innerHTML = "";

        if (data.length === 0) {
            ul.innerHTML = "<li class='list-group-item'>No goals found</li>";
            return;
        }

        data.forEach(goal => {
            const li = document.createElement("li");
            li.className = "list-group-item";

            li.innerHTML = `
                <strong>${goal.goalName}</strong><br>
                <em>${goal.description}</em><br>
            `;
            
            ul.appendChild(li);
        });

        if (areGoalsVisible) {
            ul.style.display = "none";
            areGoalsVisible = false;
        } else {
            ul.style.display = "block";
            areGoalsVisible = true;
        }
    } catch (error) {
        console.error(error);
    }
}

async function updateByGoalName(event) {
    event.preventDefault();

    try {
        const updateGoalByName = document.getElementById("updateGoalName").value;
        const updatedGoalName = document.getElementById("updatedGoalName").value;
        const descriptionUpdate = document.getElementById("textareaUpdate").value;

        const url = "http://localhost:5000";

        const response = await fetch(`${url}/dashboard/update-goal`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                updateGoalByName,
                updatedGoalName,
                descriptionUpdate
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(`Failed to update a user: ${response.status} ${response.statusText}`);
        } else {
            alert("Goal updated successfully!");
            console.log("Server Response:", data);
        }

        document.getElementById("updateGoalName").value = "";
        document.getElementById("updatedGoalName").value = "";
        document.getElementById("textareaUpdate").value = "";

        getAll();
    } catch (error) {
        console.error(error);
    }
}

async function deleteByGoalName(event) {
    event.preventDefault();

    try {
        const deleteGoalByName = document.getElementById("deleteGoalName").value;
        const url = "http://localhost:5000";

        const response = await fetch(`${url}/dashboard/delete-goal`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ deleteGoalByName }),
            credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(`Failed to delete a user: ${response.status} ${response.statusText}`);
        } else {
            alert("Goal deleted successfully!");
            console.log("Server Response:", data);
        }

        document.getElementById("deleteGoalName").value = "";

        getAll();
    } catch (error) {
        console.error(error);
    }
}

let goalsVisible = true
function Search(event) {
    event.preventDefault();

    try {
        if (goalsVisible) {
            const input = document.getElementById("search");
            const ul = document.getElementById("ul");
    
            const search = input.value.toLocaleLowerCase().trim();
            const listItems = ul.getElementsByTagName("li");
    
            for (let i = 0; i < listItems.length; i++) {
                const li = listItems[i];
                const text = li.textContent.toLocaleLowerCase().trim();
    
                if (text.startsWith(search)) {
                    li.style.display = "";
                } else {
                    li.style.display = "none";
                }
            }
        }
    } catch (error) {
        console.error(error);
    }
}