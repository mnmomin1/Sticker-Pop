import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Dimensions,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

type Props = {
  onSelect: (emoji: string) => void;
  onCloseModal: () => void;
};

type EmojiFromApi = {
  id: string;
  title: string;
  emoji: string;
  annotation: string;
  hexcode: string;
  group: string;
  slug: string;
};

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function EmojiList({ onSelect, onCloseModal }: Props) {
  const [emojiList, setEmojiList] = useState<EmojiFromApi[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://www.emoji.family/api/emojis")
      .then((res) => res.json())
      .then((json) => {
        let emojis: EmojiFromApi[] = [];
        if (Array.isArray(json)) emojis = json;
        else if (json?.data) emojis = json.data;
        else if (json?.emojis) emojis = json.emojis;
        setEmojiList(emojis);
      })
      .catch(() => setEmojiList(getFallbackEmojis()))
      .finally(() => setLoading(false));
  }, []);

  const getFallbackEmojis = (): EmojiFromApi[] => [
    { id: "1", emoji: "😀", annotation: "grinning", title: "Grinning Face", hexcode: "1f600", group: "smileys", slug: "grinning" },
    { id: "2", emoji: "😂", annotation: "joy", title: "Joy", hexcode: "1f602", group: "smileys", slug: "joy" },
    { id: "3", emoji: "❤️", annotation: "heart", title: "Heart", hexcode: "2764", group: "symbols", slug: "heart" },
    { id: "4", emoji: "👍", annotation: "thumbs up", title: "Thumbs Up", hexcode: "1f44d", group: "people", slug: "thumbsup" },
    { id: "5", emoji: "🎉", annotation: "party", title: "Party", hexcode: "1f389", group: "activities", slug: "party" },
    { id: "6", emoji: "🔥", annotation: "fire", title: "Fire", hexcode: "1f525", group: "symbols", slug: "fire" },
    { id: "7", emoji: "⭐", annotation: "star", title: "Star", hexcode: "2b50", group: "symbols", slug: "star" },
    { id: "8", emoji: "🙏", annotation: "pray", title: "Pray", hexcode: "1f64f", group: "people", slug: "pray" },
    { id: "9", emoji: "😊", annotation: "smile", title: "Smile", hexcode: "1f60a", group: "smileys", slug: "smile" },
    { id: "10", emoji: "🥰", annotation: "love", title: "Love", hexcode: "1f970", group: "smileys", slug: "love" },
    { id: "11", emoji: "😎", annotation: "cool", title: "Cool", hexcode: "1f60e", group: "smileys", slug: "cool" },
    { id: "12", emoji: "🤔", annotation: "thinking", title: "Thinking", hexcode: "1f914", group: "smileys", slug: "thinking" },
    { id: "13", emoji: "🎂", annotation: "cake", title: "Cake", hexcode: "1f370", group: "food", slug: "cake" },
    { id: "14", emoji: "🚀", annotation: "rocket", title: "Rocket", hexcode: "1f680", group: "travel", slug: "rocket" },
    { id: "15", emoji: "💯", annotation: "100", title: "100", hexcode: "1f4af", group: "symbols", slug: "100" },
    { id: "16", emoji: "✨", annotation: "sparkles", title: "Sparkles", hexcode: "2728", group: "symbols", slug: "sparkles" },
    { id: "17", emoji: "🎨", annotation: "art", title: "Art", hexcode: "1f3a8", group: "activities", slug: "art" },
    { id: "18", emoji: "🌙", annotation: "moon", title: "Moon", hexcode: "1f319", group: "nature", slug: "moon" },
    { id: "19", emoji: "🐱", annotation: "cat", title: "Cat", hexcode: "1f431", group: "animals", slug: "cat" },
    { id: "20", emoji: "🌈", annotation: "rainbow", title: "Rainbow", hexcode: "1f308", group: "nature", slug: "rainbow" },
  ];

  // Calculate how many emojis fit in one row
  const getEmojisPerRow = () => {
    const emojiSize = 50;
    const emojiMargin = 6;
    const containerPadding = 20;
    const availableWidth = SCREEN_WIDTH - containerPadding;
    return Math.floor(availableWidth / (emojiSize + emojiMargin * 2));
  };

  // Group emojis into pages for horizontal scrolling
  const groupEmojisIntoPages = (emojis: EmojiFromApi[], emojisPerRow: number, rowsPerPage: number = 4) => {
    const emojisPerPage = emojisPerRow * rowsPerPage;
    const pages = [];
    
    for (let i = 0; i < emojis.length; i += emojisPerPage) {
      const pageEmojis = emojis.slice(i, i + emojisPerPage);
      
      // Group page emojis into rows
      const pageRows = [];
      for (let j = 0; j < pageEmojis.length; j += emojisPerRow) {
        pageRows.push(pageEmojis.slice(j, j + emojisPerRow));
      }
      pages.push(pageRows);
    }
    
    return pages;
  };

  const renderEmoji = (item: EmojiFromApi) => (
    <Pressable
      key={item.hexcode}
      style={styles.emojiWrapper}
      onPress={() => {
        onSelect(item.emoji);
        onCloseModal();
      }}
    >
      <Text style={styles.emojiText}>{item.emoji}</Text>
    </Pressable>
  );

  const renderRow = (rowEmojis: EmojiFromApi[], rowIndex: number) => (
    <View key={rowIndex} style={styles.emojiRow}>
      {rowEmojis.map(renderEmoji)}
    </View>
  );

  const renderPage = (pageRows: EmojiFromApi[][], pageIndex: number) => (
    <View key={pageIndex} style={styles.pageContainer}>
      {pageRows.map(renderRow)}
    </View>
  );

  if (isLoading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  const emojisPerRow = getEmojisPerRow();
  const pages = groupEmojisIntoPages(emojiList, emojisPerRow, 4);

  return (
    <ScrollView 
      horizontal 
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      style={styles.horizontalScrollView}
    >
      {pages.map(renderPage)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  horizontalScrollView: {
    flex: 1,
  },
  pageContainer: {
    width: SCREEN_WIDTH,
    padding: 20,
  },
  emojiRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 5,
  },
  emojiWrapper: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    margin: 6,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
  },
  emojiText: {
    fontSize: 24,
  },
  loader: {
    marginTop: 20,
  },
});