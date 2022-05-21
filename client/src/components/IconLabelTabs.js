import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import RateReviewIcon from '@material-ui/icons/RateReview';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function IconLabelTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState((window.location.pathname === "/reviews") ? 0 : 1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.handleTabChange(newValue);
  };
  const{lang} = props
  return (
    <Paper square className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        aria-label="icon label tabs example"
      >
        <Tab icon={<RateReviewIcon />} label={lang ? "Reviews" : "التقييمات"} />
        <Tab icon={<QuestionAnswerIcon />} label={lang ? "Questions" : "الاسئلة"} />
      </Tabs>
    </Paper>
  );
}
