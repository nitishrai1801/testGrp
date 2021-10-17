import "./App.css";
import ChatopsGroupsHome from "./ChatopsGroupHome";

import { Route, Switch } from "react-router-dom";
import GroupDetails from "./GroupDetails";
import CreateGroup from "./CreateGroup";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact />
        <Route path="/mui/groups" component={ChatopsGroupsHome} exact />
        <Route path="/mui/groups/groupdetails/:groupName" component={GroupDetails}/>
        {/* change group details to /groups/:id */}
        <Route path="/mui/groups/create" component={CreateGroup} />
      </Switch>
    </div>
  );
}

export default App;
