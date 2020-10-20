import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import React from 'react';

import jsonData from '@components/Table/data.json';

const useStyles = makeStyles({
  table: {
    minWidth: 800,
  },
});

const STableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);

const STableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: "#CBC8D1",
      color: "#5D5B60",
      fontWeight: theme.typography.fontWeightBold,
      minWidth: 100
    },
    body: {
      fontSize: 14
    },
  }),
)(TableCell);

function DataTable(): React.ReactElement {
  const classes = useStyles();

  const convertValue = (value: any) => {
    switch(typeof(value)) {
      case 'boolean':
        if (value === true) {
          return 'Да'
        } else {
          return 'Нет'
        }
      case 'object':
        return '[object]'
      case 'function':
        return '[function]'
      default:
        return value.toString()
    }
  }

  const renderLines = () => {
    let list:object[] = []

    jsonData.map((rows) => {
      let info:object[] = []

      Object.values(rows).forEach((value) => info.push(( // @todo проверку пропусков по количеству ячеек
        <TableCell>
          {convertValue(value)}
        </TableCell>
      )))

      list.push(
        (
          <STableRow>
            {info}
          </STableRow>
        )
      )

      return null
    })

    return list
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="main table">
        <TableHead>
          <STableRow>
            <STableCell>Номер</STableCell>
            <STableCell>Имя</STableCell>
            <STableCell>Возраст</STableCell>
            <STableCell>Средний балл</STableCell>
            <STableCell>Является ли волонтёром</STableCell>
            <STableCell>Любимые дисциплины</STableCell>
            <STableCell>Экзамен</STableCell>
            <STableCell>Оценка по экзамену</STableCell>
            <STableCell>Стипендия</STableCell>
            <STableCell>Курс</STableCell>
            <STableCell>Имеет ли долги</STableCell>
          </STableRow>
        </TableHead>
        <TableBody>
              {renderLines()}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DataTable;