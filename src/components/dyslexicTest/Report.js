import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {icons} from '../../constants';
import stylesComponent from './stylesComponent';
const Report = props => {
  const {obtainedScore, totalScore, level, resetTest, nextLevel} = props;
  console.log(nextLevel);
  let difficulty = level;
  let difficultyIcon;
  const nextLevelCheck = obtainedScore >= totalScore - 2 ? true : false;
  let difficultyLevel;
  if (difficulty == 'Level 1')
    (difficultyLevel = 'Easy'), (difficultyIcon = icons.difficultyEasy);
  if (difficulty == 'Level 2')
    (difficultyLevel = 'Medium'), (difficultyIcon = icons.difficultyMedium);
  if (difficulty == 'Level 3')
    (difficultyLevel = 'Hard'), (difficultyIcon = icons.difficultyHard);
  return (
    <View style={stylesComponent.reportContainer}>
      <View style={stylesComponent.reportBody}>
        <View style={stylesComponent.reportLevel}>
          <Text style={stylesComponent.title}>{level}</Text>
          <Text style={stylesComponent.headingText}>Report</Text>
        </View>
        <View style={stylesComponent.scoreContainer}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={difficultyIcon}
              style={stylesComponent.listenImage}
              resizeMode="cover"
            />
            <Text style={stylesComponent.subHeading}>Diffculty</Text>
            <Text style={stylesComponent.paragrapgh}>{difficultyLevel}</Text>
          </View>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={icons.scoreIcon}
              style={stylesComponent.listenImage}
              resizeMode="contain"
            />
            <Text
              style={[
                stylesComponent.subHeading,
                {color: obtainedScore >= totalScore - 2 ? 'green' : 'red'},
              ]}>
              Score
            </Text>
            <Text
              style={[
                stylesComponent.paragrapgh,
                {color: obtainedScore >= totalScore - 2 ? 'green' : 'red'},
              ]}>
              {obtainedScore} / {totalScore}
            </Text>
          </View>
        </View>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'column',
          }}>
          <Text style={stylesComponent.headingText}>Remarks</Text>
          <Text style={stylesComponent.paragrapgh}>
            You have to correct {totalScore - 2} questions out of {totalScore}
          </Text>
          <Text style={stylesComponent.paragrapgh}>move on to next level</Text>
        </View>
        <View style={stylesComponent.buttonContainer}>
          <TouchableOpacity
            onPress={() => resetTest()}
            style={stylesComponent.nextButton}>
            <Text style={stylesComponent.paragrapgh}>Reset Test</Text>
          </TouchableOpacity>
          {nextLevelCheck ? (
            <TouchableOpacity
              onPress={() => nextLevel()}
              style={stylesComponent.nextButton}>
              <Text style={stylesComponent.paragrapgh}>Next Level</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default Report;