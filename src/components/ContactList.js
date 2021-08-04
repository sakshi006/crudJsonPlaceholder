import { Link } from "react-router-dom";
import Table from "./DenseTable";
import { makeStyles } from "@material-ui/core/styles";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

const useStyles = makeStyles({
  tableRow: {
    width: "22.5%",
    padding: "0px 20px",
    fontWeight: "bolder",
  },
});

const ContactList = (props) => {
  const deleteConactHandler = (id) => {
    props.getContactId(id);
  };

  const renderContactList = props.contacts.map((contact) => {
    return (
      <Table
        contact={contact}
        clickHander={deleteConactHandler}
        key={contact.id}
      />
    );
  });

  const classes = useStyles();
  return (
    <div className="main">
      <h2>
        Contact List
        <Link to="/add">
          <button className="ui button blue right">Add Contact</button>
        </Link>
      </h2>
      <TableHead>
        <TableRow>
          <TableCell className={classes.tableRow}>NAME</TableCell>
          <TableCell className={classes.tableRow}>USERNAME</TableCell>
          <TableCell className={classes.tableRow}>EMAIL</TableCell>
          <TableCell className={classes.tableRow}>PHONE</TableCell>
          <TableCell className={classes.tableRow}>WEBSITE</TableCell>
        </TableRow>
      </TableHead>

      <div className="ui celled list">{renderContactList}</div>
    </div>
  );
};

export default ContactList;
