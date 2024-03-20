let record = [];

const save = () => {
    let id = Math.floor(Math.random() * 1000);
    let name = document.getElementById('name').value;
    let phone = document.getElementById('phone').value;
    if (!name || !phone) {
        alert('Name & Phone compalsary Required...');
        return false;
    }

    let obj = {
        id: id,
        name: name,
        phone, phone
    }

    if (!localStorage.getItem('users')) {
        record.push(obj);
        localStorage.setItem('users', JSON.stringify(record));
    } else {
        let old = JSON.parse(localStorage.getItem('users'));
        old.push(obj);
        localStorage.setItem('users', JSON.stringify(old));
    }
    document.getElementById('name').value = " ";
    document.getElementById('phone').value = " ";

    viewRecord();
}

const viewRecord = () => {
    document.getElementById('edit').style.display = "none";
    let allRecord = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
    let tbl = "";
    allRecord.map((val) => {
        return tbl += `
            <tr>
                <td>${val.id}</td>
                <td>${val.name}</td>
                <td>${val.phone}</td>
                <td>
                    <button onclick="deletRecord(${val.id})">Delete</button>
                    <button onclick="editRecord(${val.id})">Edit</button>
                </td>
            </tr>
        `
    });
    document.getElementById('record').innerHTML = tbl;
}

const deletRecord = (id) => {
    let all = JSON.parse(localStorage.getItem('users'));
    let data = all.filter((val) => {
        return val.id != id;
    })
    localStorage.setItem('users', JSON.stringify(data));
    viewRecord();
}

