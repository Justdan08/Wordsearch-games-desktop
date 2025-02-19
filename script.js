{\rtf1\ansi\ansicpg1252\cocoartf2761
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 Menlo-Regular;}
{\colortbl;\red255\green255\blue255;\red80\green91\blue117;\red19\green22\blue30;\red246\green249\blue255;
\red111\green143\blue180;\red164\green121\blue157;\red147\green179\blue121;\red119\green179\blue197;}
{\*\expandedcolortbl;;\cssrgb\c38824\c43529\c53333;\cssrgb\c9412\c11373\c15686;\cssrgb\c97255\c98039\c100000;
\cssrgb\c50588\c63137\c75686;\cssrgb\c70588\c55686\c67843;\cssrgb\c63922\c74510\c54902;\cssrgb\c53333\c75294\c81569;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs25\fsmilli12573 \cf2 \cb3 \expnd0\expndtw0\kerning0
// Word Search Configuration\cf4 \
\pard\pardeftab720\partightenfactor0
\cf5 const\cf4  gridSize \cf5 =\cf4  \cf6 10\cf5 ;\cf4 \
\cf5 const\cf4  words \cf5 =\cf4  \cf5 [\cf7 \'93BLACKPANTHER\'94\cf5 ,\cf4  \cf7 \'93HULK\'94\cf5 ,\cf4  \cf7 \'93SPIDERMAN\'94\cf5 ,\cf4  \cf7 "WEB"\cf5 ,\cf4  \cf7 "GAME"\cf5 ];\cf4 \
\cf5 let\cf4  selectedCells \cf5 =\cf4  \cf5 [];\cf4 \
\cf5 let\cf4  foundWords \cf5 =\cf4  \cf5 [];\cf4 \
\cf5 let\cf4  isDragging \cf5 =\cf4  \cf5 false;\cf4 \
\
\pard\pardeftab720\partightenfactor0
\cf2 // Generate the word search grid\cf4 \
\pard\pardeftab720\partightenfactor0
\cf5 const\cf4  wordsearch \cf5 =\cf4  document\cf5 .\cf8 getElementById\cf5 (\cf7 "wordsearch"\cf5 );\cf4 \
\cf5 const\cf4  wordsContainer \cf5 =\cf4  document\cf5 .\cf8 getElementById\cf5 (\cf7 "words"\cf5 );\cf4 \
\
\pard\pardeftab720\partightenfactor0
\cf2 // Display words to find\cf4 \
words\cf5 .\cf8 forEach\cf5 (\cf4 word \cf5 =>\cf4  \cf5 \{\cf4 \
  \cf5 const\cf4  wordElement \cf5 =\cf4  document\cf5 .\cf8 createElement\cf5 (\cf7 "div"\cf5 );\cf4 \
  wordElement\cf5 .\cf4 textContent \cf5 =\cf4  word\cf5 ;\cf4 \
  wordsContainer\cf5 .\cf8 appendChild\cf5 (\cf4 wordElement\cf5 );\cf4 \
\pard\pardeftab720\partightenfactor0
\cf5 \});\cf4 \
\
\pard\pardeftab720\partightenfactor0
\cf2 // Create the grid\cf4 \
\pard\pardeftab720\partightenfactor0
\cf5 for\cf4  \cf5 (let\cf4  i \cf5 =\cf4  \cf6 0\cf5 ;\cf4  i \cf5 <\cf4  gridSize\cf5 ;\cf4  i\cf5 ++)\cf4  \cf5 \{\cf4 \
  \cf5 for\cf4  \cf5 (let\cf4  j \cf5 =\cf4  \cf6 0\cf5 ;\cf4  j \cf5 <\cf4  gridSize\cf5 ;\cf4  j\cf5 ++)\cf4  \cf5 \{\cf4 \
    \cf5 const\cf4  cell \cf5 =\cf4  document\cf5 .\cf8 createElement\cf5 (\cf7 "div"\cf5 );\cf4 \
    cell\cf5 .\cf4 classList\cf5 .\cf8 add\cf5 (\cf7 "cell"\cf5 );\cf4 \
    cell\cf5 .\cf4 dataset\cf5 .\cf4 row \cf5 =\cf4  i\cf5 ;\cf4 \
    cell\cf5 .\cf4 dataset\cf5 .\cf4 col \cf5 =\cf4  j\cf5 ;\cf4 \
    cell\cf5 .\cf4 textContent \cf5 =\cf4  \cf8 getRandomLetter\cf5 ();\cf4 \
    cell\cf5 .\cf8 addEventListener\cf5 (\cf7 "mousedown"\cf5 ,\cf4  \cf5 ()\cf4  \cf5 =>\cf4  \cf8 startDrag\cf5 (\cf4 cell\cf5 ));\cf4 \
    cell\cf5 .\cf8 addEventListener\cf5 (\cf7 "mouseenter"\cf5 ,\cf4  \cf5 ()\cf4  \cf5 =>\cf4  \cf8 dragOver\cf5 (\cf4 cell\cf5 ));\cf4 \
    cell\cf5 .\cf8 addEventListener\cf5 (\cf7 "mouseup"\cf5 ,\cf4  endDrag\cf5 );\cf4 \
    wordsearch\cf5 .\cf8 appendChild\cf5 (\cf4 cell\cf5 );\cf4 \
  \cf5 \}\cf4 \
\cf5 \}\cf4 \
\
\pard\pardeftab720\partightenfactor0
\cf2 // Place words in the grid\cf4 \
words\cf5 .\cf8 forEach\cf5 (\cf4 word \cf5 =>\cf4  \cf5 \{\cf4 \
  \cf8 placeWord\cf5 (\cf4 word\cf5 );\cf4 \
\pard\pardeftab720\partightenfactor0
\cf5 \});\cf4 \
\
\pard\pardeftab720\partightenfactor0
\cf2 // Function to place a word in the grid\cf4 \
\pard\pardeftab720\partightenfactor0
\cf5 function\cf4  \cf8 placeWord\cf5 (\cf4 word\cf5 )\cf4  \cf5 \{\cf4 \
  \cf5 const\cf4  direction \cf5 =\cf4  Math\cf5 .\cf8 random\cf5 ()\cf4  \cf5 <\cf4  \cf6 0.5\cf4  \cf5 ?\cf4  \cf7 "horizontal"\cf4  \cf5 :\cf4  \cf7 "vertical"\cf5 ;\cf4 \
  \cf5 let\cf4  row\cf5 ,\cf4  col\cf5 ;\cf4 \
\
  \cf5 if\cf4  \cf5 (\cf4 direction \cf5 ===\cf4  \cf7 "horizontal"\cf5 )\cf4  \cf5 \{\cf4 \
    row \cf5 =\cf4  Math\cf5 .\cf8 floor\cf5 (\cf4 Math\cf5 .\cf8 random\cf5 ()\cf4  \cf5 *\cf4  gridSize\cf5 );\cf4 \
    col \cf5 =\cf4  Math\cf5 .\cf8 floor\cf5 (\cf4 Math\cf5 .\cf8 random\cf5 ()\cf4  \cf5 *\cf4  \cf5 (\cf4 gridSize \cf5 -\cf4  word\cf5 .\cf4 length\cf5 ));\cf4 \
    \cf5 for\cf4  \cf5 (let\cf4  i \cf5 =\cf4  \cf6 0\cf5 ;\cf4  i \cf5 <\cf4  word\cf5 .\cf4 length\cf5 ;\cf4  i\cf5 ++)\cf4  \cf5 \{\cf4 \
      \cf5 const\cf4  cell \cf5 =\cf4  document\cf5 .\cf8 querySelector\cf5 (\cf7 `.cell[data-row="\cf5 $\{\cf4 row\cf5 \}\cf7 "][data-col="\cf5 $\{\cf4 col \cf5 +\cf4  i\cf5 \}\cf7 "]`\cf5 );\cf4 \
      cell\cf5 .\cf4 textContent \cf5 =\cf4  word\cf5 [\cf4 i\cf5 ];\cf4 \
    \cf5 \}\cf4 \
  \cf5 \}\cf4  \cf5 else\cf4  \cf5 \{\cf4 \
    col \cf5 =\cf4  Math\cf5 .\cf8 floor\cf5 (\cf4 Math\cf5 .\cf8 random\cf5 ()\cf4  \cf5 *\cf4  gridSize\cf5 );\cf4 \
    row \cf5 =\cf4  Math\cf5 .\cf8 floor\cf5 (\cf4 Math\cf5 .\cf8 random\cf5 ()\cf4  \cf5 *\cf4  \cf5 (\cf4 gridSize \cf5 -\cf4  word\cf5 .\cf4 length\cf5 ));\cf4 \
    \cf5 for\cf4  \cf5 (let\cf4  i \cf5 =\cf4  \cf6 0\cf5 ;\cf4  i \cf5 <\cf4  word\cf5 .\cf4 length\cf5 ;\cf4  i\cf5 ++)\cf4  \cf5 \{\cf4 \
      \cf5 const\cf4  cell \cf5 =\cf4  document\cf5 .\cf8 querySelector\cf5 (\cf7 `.cell[data-row="\cf5 $\{\cf4 row \cf5 +\cf4  i\cf5 \}\cf7 "][data-col="\cf5 $\{\cf4 col\cf5 \}\cf7 "]`\cf5 );\cf4 \
      cell\cf5 .\cf4 textContent \cf5 =\cf4  word\cf5 [\cf4 i\cf5 ];\cf4 \
    \cf5 \}\cf4 \
  \cf5 \}\cf4 \
\cf5 \}\cf4 \
\
\pard\pardeftab720\partightenfactor0
\cf2 // Function to get a random letter\cf4 \
\pard\pardeftab720\partightenfactor0
\cf5 function\cf4  \cf8 getRandomLetter\cf5 ()\cf4  \cf5 \{\cf4 \
  \cf5 const\cf4  letters \cf5 =\cf4  \cf7 "ABCDEFGHIJKLMNOPQRSTUVWXYZ"\cf5 ;\cf4 \
  \cf5 return\cf4  letters\cf5 [\cf4 Math\cf5 .\cf8 floor\cf5 (\cf4 Math\cf5 .\cf8 random\cf5 ()\cf4  \cf5 *\cf4  letters\cf5 .\cf4 length\cf5 )];\cf4 \
\cf5 \}\cf4 \
\
\pard\pardeftab720\partightenfactor0
\cf2 // Drag and drop functionality\cf4 \
\pard\pardeftab720\partightenfactor0
\cf5 function\cf4  \cf8 startDrag\cf5 (\cf4 cell\cf5 )\cf4  \cf5 \{\cf4 \
  isDragging \cf5 =\cf4  \cf5 true;\cf4 \
  selectedCells \cf5 =\cf4  \cf5 [\cf4 cell\cf5 ];\cf4 \
  cell\cf5 .\cf4 classList\cf5 .\cf8 add\cf5 (\cf7 "selected"\cf5 );\cf4 \
\cf5 \}\cf4 \
\
\cf5 function\cf4  \cf8 dragOver\cf5 (\cf4 cell\cf5 )\cf4  \cf5 \{\cf4 \
  \cf5 if\cf4  \cf5 (\cf4 isDragging \cf5 &&\cf4  \cf5 !\cf4 selectedCells\cf5 .\cf8 includes\cf5 (\cf4 cell\cf5 ))\cf4  \cf5 \{\cf4 \
    selectedCells\cf5 .\cf8 push\cf5 (\cf4 cell\cf5 );\cf4 \
    cell\cf5 .\cf4 classList\cf5 .\cf8 add\cf5 (\cf7 "selected"\cf5 );\cf4 \
  \cf5 \}\cf4 \
\cf5 \}\cf4 \
\
\cf5 function\cf4  \cf8 endDrag\cf5 ()\cf4  \cf5 \{\cf4 \
  isDragging \cf5 =\cf4  \cf5 false;\cf4 \
  \cf8 checkForWord\cf5 ();\cf4 \
\cf5 \}\cf4 \
\
\pard\pardeftab720\partightenfactor0
\cf2 // Function to check if selected cells form a word\cf4 \
\pard\pardeftab720\partightenfactor0
\cf5 function\cf4  \cf8 checkForWord\cf5 ()\cf4  \cf5 \{\cf4 \
  \cf5 const\cf4  selectedWord \cf5 =\cf4  selectedCells\cf5 .\cf8 map\cf5 (\cf4 cell \cf5 =>\cf4  cell\cf5 .\cf4 textContent\cf5 ).\cf8 join\cf5 (\cf7 ""\cf5 );\cf4 \
  \cf5 if\cf4  \cf5 (\cf4 words\cf5 .\cf8 includes\cf5 (\cf4 selectedWord\cf5 )\cf4  \cf5 &&\cf4  \cf5 !\cf4 foundWords\cf5 .\cf8 includes\cf5 (\cf4 selectedWord\cf5 ))\cf4  \cf5 \{\cf4 \
    foundWords\cf5 .\cf8 push\cf5 (\cf4 selectedWord\cf5 );\cf4 \
    selectedCells\cf5 .\cf8 forEach\cf5 (\cf4 cell \cf5 =>\cf4  cell\cf5 .\cf4 classList\cf5 .\cf8 add\cf5 (\cf7 "found"\cf5 ));\cf4 \
    selectedCells \cf5 =\cf4  \cf5 [];\cf4 \
\
    \cf2 // Mark the word as found in the word list\cf4 \
    \cf5 const\cf4  wordElements \cf5 =\cf4  wordsContainer\cf5 .\cf8 querySelectorAll\cf5 (\cf7 "div"\cf5 );\cf4 \
    wordElements\cf5 .\cf8 forEach\cf5 (\cf4 el \cf5 =>\cf4  \cf5 \{\cf4 \
      \cf5 if\cf4  \cf5 (\cf4 el\cf5 .\cf4 textContent \cf5 ===\cf4  selectedWord\cf5 )\cf4  \cf5 \{\cf4 \
        el\cf5 .\cf4 classList\cf5 .\cf8 add\cf5 (\cf7 "found"\cf5 );\cf4 \
      \cf5 \}\cf4 \
    \cf5 \});\cf4 \
\
    \cf5 if\cf4  \cf5 (\cf4 foundWords\cf5 .\cf4 length \cf5 ===\cf4  words\cf5 .\cf4 length\cf5 )\cf4  \cf5 \{\cf4 \
      \cf8 alert\cf5 (\cf7 "Good Job Big Dog!"\cf5 );\cf4 \
    \cf5 \}\cf4 \
  \cf5 \}\cf4  \cf5 else\cf4  \cf5 \{\cf4 \
    selectedCells\cf5 .\cf8 forEach\cf5 (\cf4 cell \cf5 =>\cf4  cell\cf5 .\cf4 classList\cf5 .\cf8 remove\cf5 (\cf7 "selected"\cf5 ));\cf4 \
    selectedCells \cf5 =\cf4  \cf5 [];\cf4 \
  \cf5 \}\cf4 \
\cf5 \}\cf4 \
\
\pard\pardeftab720\partightenfactor0
\cf2 // Reset button functionality\cf4 \
document\cf5 .\cf8 getElementById\cf5 (\cf7 "reset-button"\cf5 ).\cf8 addEventListener\cf5 (\cf7 "click"\cf5 ,\cf4  \cf5 ()\cf4  \cf5 =>\cf4  \cf5 \{\cf4 \
  wordsearch\cf5 .\cf4 innerHTML \cf5 =\cf4  \cf7 ""\cf5 ;\cf4 \
  wordsContainer\cf5 .\cf4 innerHTML \cf5 =\cf4  \cf7 "<div>Words to find:</div>"\cf5 ;\cf4 \
  selectedCells \cf5 =\cf4  \cf5 [];\cf4 \
  foundWords \cf5 =\cf4  \cf5 [];\cf4 \
  \cf8 initializeGame\cf5 ();\cf4 \
\pard\pardeftab720\partightenfactor0
\cf5 \});\cf4 \
\
\cf5 function\cf4  \cf8 initializeGame\cf5 ()\cf4  \cf5 \{\cf4 \
  \cf2 // Reinitialize the game\cf4 \
  words\cf5 .\cf8 forEach\cf5 (\cf4 word \cf5 =>\cf4  \cf5 \{\cf4 \
    \cf5 const\cf4  wordElement \cf5 =\cf4  document\cf5 .\cf8 createElement\cf5 (\cf7 "div"\cf5 );\cf4 \
    wordElement\cf5 .\cf4 textContent \cf5 =\cf4  word\cf5 ;\cf4 \
    wordsContainer\cf5 .\cf8 appendChild\cf5 (\cf4 wordElement\cf5 );\cf4 \
  \cf5 \});\cf4 \
\
  \cf5 for\cf4  \cf5 (let\cf4  i \cf5 =\cf4  \cf6 0\cf5 ;\cf4  i \cf5 <\cf4  gridSize\cf5 ;\cf4  i\cf5 ++)\cf4  \cf5 \{\cf4 \
    \cf5 for\cf4  \cf5 (let\cf4  j \cf5 =\cf4  \cf6 0\cf5 ;\cf4  j \cf5 <\cf4  gridSize\cf5 ;\cf4  j\cf5 ++)\cf4  \cf5 \{\cf4 \
      \cf5 const\cf4  cell \cf5 =\cf4  document\cf5 .\cf8 createElement\cf5 (\cf7 "div"\cf5 );\cf4 \
      cell\cf5 .\cf4 classList\cf5 .\cf8 add\cf5 (\cf7 "cell"\cf5 );\cf4 \
      cell\cf5 .\cf4 dataset\cf5 .\cf4 row \cf5 =\cf4  i\cf5 ;\cf4 \
      cell\cf5 .\cf4 dataset\cf5 .\cf4 col \cf5 =\cf4  j\cf5 ;\cf4 \
      cell\cf5 .\cf4 textContent \cf5 =\cf4  \cf8 getRandomLetter\cf5 ();\cf4 \
      cell\cf5 .\cf8 addEventListener\cf5 (\cf7 "mousedown"\cf5 ,\cf4  \cf5 ()\cf4  \cf5 =>\cf4  \cf8 startDrag\cf5 (\cf4 cell\cf5 ));\cf4 \
      cell\cf5 .\cf8 addEventListener\cf5 (\cf7 "mouseenter"\cf5 ,\cf4  \cf5 ()\cf4  \cf5 =>\cf4  \cf8 dragOver\cf5 (\cf4 cell\cf5 ));\cf4 \
      cell\cf5 .\cf8 addEventListener\cf5 (\cf7 "mouseup"\cf5 ,\cf4  endDrag\cf5 );\cf4 \
      wordsearch\cf5 .\cf8 appendChild\cf5 (\cf4 cell\cf5 );\cf4 \
    \cf5 \}\cf4 \
  \cf5 \}\cf4 \
\
  words\cf5 .\cf8 forEach\cf5 (\cf4 word \cf5 =>\cf4  \cf5 \{\cf4 \
    \cf8 placeWord\cf5 (\cf4 word\cf5 );\cf4 \
  \cf5 \});\cf4 \
\cf5 \}}