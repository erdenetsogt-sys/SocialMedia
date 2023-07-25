import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
// import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "../util/hooks";

<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"
/>;

function Login() {
  const [errors, setErrors] = useState({});
  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: "",
    password: "",
  });
  function loginUserCallback() {
    loginUser();
  }

  const navigate = useNavigate();

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, result) {
      setErrors({});
      navigate("/");
    },
    onError(err) {
      // if (err.graphQLErrors[0]?.extensions?.exception?.errors) {
      // setErrors(err.graphQLErrors[0].extensions.exception.errors);
      if (err.graphQLErrors[0]?.extensions?.errors) {
        // Extract and set the validation errors
        setErrors(err.graphQLErrors[0].extensions.errors);
      } else {
        // Handle other types of errors if needed
        console.error("An error occurred dude:", err);
      }
    },
    variables: values,
  });

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Login</h1>
        <Form.Input
          label="Username"
          placeholder="Username..."
          name="username"
          type="text"
          error={errors.username ? true : false}
          value={values.username}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password..."
          name="password"
          type="password"
          error={errors.password ? true : false}
          value={values.password}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Login
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Login;
