import CollapseList from 'components/collapse-list';
import Question from 'components/question';
import Text from 'components/text';
import { memo, useCallback, useEffect, useState } from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { checkedAnswerAtom } from '../../recoil/checked-answer';
import { indexSentenceAtom } from '../../recoil/index-sentence';
import { statusSentenceAtom } from '../../recoil/status-sentence';
import { styles } from './tab-screen.style';

const TabScreen = props => {
  const { questionList, readOnly, examKey, noMap, defaultData } = props;
  const [tabIndex, setTabIndex] = useRecoilState(indexSentenceAtom);
  const currentQuestion = questionList.find(item => item.id === tabIndex);
  const [showButtonAnswer, setShowButtonAnswer] = useState(false);
  const [answered, setAnswered] = useState();
  const [answeredQuestionIndex, setAnsweredQuestionIndex] = useState();
  const [statusSentence, setStatusSentences] = useRecoilState(
    statusSentenceAtom(examKey),
  );
  const [checkedAnswer, setCheckedAnswer] = useRecoilState(
    checkedAnswerAtom(`${examKey}_${currentQuestion.id}`),
  );
  const resetCheckedAnswer = useResetRecoilState(
    checkedAnswerAtom(`${examKey}_${currentQuestion.id}`),
  );

  const getCurrentAnswer = useCallback(
    (item, index, questionIndex, selectedAnswer) => {
      if (typeof index === 'number' && selectedAnswer !== undefined) {
        setShowButtonAnswer(true);
      } else {
        setShowButtonAnswer(false);
      }
      setAnswered(item);
      setAnsweredQuestionIndex(questionIndex);
    },
    [],
  );

  const onCheckAnswer = useCallback(() => {
    if (answered) {
      setCheckedAnswer(true);
      setStatusSentences(prev =>
        prev.map(item => {
          if (item.id === answeredQuestionIndex) {
            return {
              id: item.id,
              status: currentQuestion.correctAnswer === answered.value,
            };
          }
          return item;
        }),
      );
    }
  }, [
    answered,
    setCheckedAnswer,
    setStatusSentences,
    answeredQuestionIndex,
    currentQuestion.correctAnswer,
  ]);

  useEffect(() => {
    return () => {
      resetCheckedAnswer();
    };
  }, [resetCheckedAnswer]);

  return (
    <SafeAreaView style={styles.savMain}>
      <View style={{ flex: 1 }}>
        <Question
          examKey={examKey}
          data={currentQuestion}
          readOnly={readOnly}
          getCurrentAnswer={getCurrentAnswer}
          defaultData={defaultData}
        />
      </View>

      {showButtonAnswer && !checkedAnswer && (
        <View style={{ alignItems: 'flex-end' }}>
          <TouchableOpacity
            onPress={onCheckAnswer}
            activeOpacity={0.8}
            style={styles.toBtnCheckAnswer}>
            <Ionicon name="checkmark" color="#FFF" size={20} />
            <Text style={styles.tBtnCheckAnswer}>Đáp án</Text>
          </TouchableOpacity>
        </View>
      )}
      {readOnly ||
        (noMap && (
          <CollapseList
            questionList={questionList}
            currentQuestionIndex={tabIndex}
            onSelectQuestion={(tab, index) => setTabIndex(index)}
          />
        ))}
    </SafeAreaView>
  );
};

export default memo(TabScreen);
