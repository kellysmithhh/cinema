import './ManageUsers.css'

function ManageUsers() {
    return (
        <div>
            <h1>Manage Users</h1>
            <table>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Promotions</th>
                    <th>Actions</th>
                </tr>
                <tr>
                    <td>Walker</td>
                    <td>Bryant</td>
                    <td>Subscriber</td>
                    <td><button>Delete</button></td>
                </tr>
                <tr>
                    <td>Kelly</td>
                    <td>Smith</td>
                    <td>Subscriber</td>
                    <td><button>Delete</button></td>
                </tr>
            </table>
        </div>
    )
}

export default ManageUsers;