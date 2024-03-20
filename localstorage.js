
let record = [];

const save = () => {
    let name = document.getElementById('name').value;
    let phone = document.getElementById('phone').value;
    if (!name || !phone) {
        alert('Name & Phone compalsary Required...');
        return;
    }

    const obj = {
        id: Math.floor(Math.random() * 1000),
        name: name,
        phone: phone
    }

    if (!localStorage.getItem('users')) {
        record.push(obj);
        localStorage.setItem('users', JSON.stringify(record));
    } else {
        var old = JSON.parse(localStorage.getItem('users'));
        old.push(obj);
        localStorage.setItem('users', JSON.stringify(old));
    }
    document.getElementById('name').value = "";
    document.getElementById('phone').value = "";
    alert('Data added Successfully...');
    viewRecord();
}

const viewRecord = () => {
    document.getElementById('edit').style.display = "none";
    let allRecord = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
    let tbl = "";
    allRecord.forEach((item) => {
        tbl += `
            <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.phone}</td>
                <td>
                    <button onclick="deleteRecord(${item.id})">Delete</button>
                    <button onclick="editRecord(${item.id})">Edit</button>
                </td>
            </tr>
        `;
    });
    document.getElementById('record').innerHTML = tbl;
}

const deleteRecord = (id) => {
    let allRecord = JSON.parse(localStorage.getItem('users'));
    let deletedRecord = allRecord.filter((val) => {
        return val.id != id;
    });
    localStorage.setItem('users', JSON.stringify(deletedRecord));
    alert('Data Deleted Successfully...');
    viewRecord();
}

const editRecord = (id) => {
    document.getElementById('edit').style.display = "block";
    let allRecords = JSON.parse(localStorage.getItem('users'));
    let recordedit = allRecords.find(record => record.id == id);
    document.getElementById('editid').value = id;
    document.getElementById('editname').value = recordedit.name;
    document.getElementById('editphone').value = recordedit.phone;
}

const edit = () => {
    let id = document.getElementById('editid').value;
    let name = document.getElementById('editname').value;
    let phone = document.getElementById('editphone').value;
    if (!name || !phone) {
        alert('All fields are required...');
        return false;
    }
    let all = JSON.parse(localStorage.getItem('users'));
    all.forEach((val) => {
        if (val.id == id) {
            val.name = name;
            val.phone = phone;
        }
    });
    localStorage.setItem('users', JSON.stringify(all));
    alert('Data edited successfully...');
    document.getElementById('editid').value = "";
    document.getElementById('editname').value = "";
    document.getElementById('editphone').value = "";
    viewRecord();
}
viewRecord();
