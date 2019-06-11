import React, { Component } from 'react';
import axios from "axios";

class Tasks extends Component {

    constructor(props) {
        super(props);
        this.state = {

            tasks: []
        };
    }

    componentDidMount() {
        const id = window.location.href.split('=')[1];
        this.getTasks({ idm: id });
    }

    getTasks() {

        var atoken = localStorage.getItem("jwt");


        axios.get("http://localhost:8083/tasks/myTasks", {

            headers: {
                "Authorization-Token": atoken
            }

        }

        ).then(res => {


            this.setState({ tasks: res.data });
        });
    }

    doTask(taskid) {

        var atoken = localStorage.getItem("jwt");
        localStorage.setItem("trenutniTaskId", taskid);

        axios.get("http://localhost:8083/tasks/goToTask/" + taskid, {

            headers: {
                "Authorization-Token": atoken
            }

        }

        ).then(res => {


            this.props.history.push("/" + res.data.dotaskpath);
        });


    }
    render() {



        return (
            <div>
                <h1>Tasks</h1>

                {this.state.tasks.map(task =>


                    <ul className="list-group" key={task.id}>
                        <li className="list-group-item">{task.name}<br></br><button onClick={() => { this.doTask(task.taskid) }}>Do task</button></li>
                    </ul>



                )}
            </div>
        )
    }
}

export default Tasks;
