import * as React from "react";
import { BrowserRouter, Switch, Redirect } from "react-router-dom";
import { Layout } from "./views/Layout";

export default function App() {
    return (
        <BrowserRouter>
            <Layout>
                <script>
                    alert("E")
                </script>
                <Switch>
                    <Redirect from="*" to="/" />
                </Switch>
            </Layout>
        </BrowserRouter>
    );
}
