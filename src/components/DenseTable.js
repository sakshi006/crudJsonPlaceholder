import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import user from "../images/user.jpg";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableCell: {
    width: "20%",
    height: "1.5rem",
  },
});

const DenseTable = (props) => {
  const { id, name, email, username, phone, website } = props.contact;

  const classes = useStyles();

  return (
    <>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableBody>
            <TableRow hover={true} key={id}>
              <TableCell className={classes.tableCell}>
                <img className="ui avatar image" src={user} alt="user" />
                {name}
              </TableCell>
              <TableCell className={classes.tableCell}>{username}</TableCell>
              <TableCell
                className={classes.tableCell}
                style={{ width: " 20%" }}
              >
                {email}
              </TableCell>
              <TableCell className={classes.tableCell}>{phone}</TableCell>
              <TableCell className={classes.tableCell}>{website}</TableCell>
              <span>
                <i
                  className="trash alternate outline icon"
                  style={{ color: "red" }}
                  onClick={() => props.clickHander(id)}
                ></i>
                <Link
                  to={{ pathname: `/edit`, state: { contact: props.contact } }}
                >
                  <i
                    className="edit alternate outline icon"
                    style={{ color: "blue" }}
                  ></i>
                </Link>
              </span>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default DenseTable;
