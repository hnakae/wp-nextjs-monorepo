export interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  featured?: boolean;
}

export const blogArticles: BlogArticle[] = [
  {
    id: "welcome-eugene-go-club",
    title: "Welcome to the Eugene Go Club!",
    excerpt: "Learn about our mission to spread the ancient game of Go throughout the Eugene community and how you can get involved.",
    content: `Welcome to the Eugene Go Club! We're thrilled you've found your way to our corner of the internet where the ancient game of Go comes alive in our modern community.

## About Our Club

The Eugene Go Club has been fostering a love for this beautiful game since 2010. What started as a small group of enthusiasts meeting in a local coffee shop has grown into a vibrant community of players of all skill levels, from complete beginners to seasoned dan-level players.

Go, also known as Weiqi or Baduk, is a 4,000-year-old strategy game that originated in China. Despite its simple rules—place stones on a board to surround territory—Go offers infinite complexity and depth that has captivated minds for millennia.

## What We Offer

**Weekly Meetings**: Every Tuesday and Thursday evening, we gather at the Eugene Public Library to play, learn, and socialize. Our meetings are open to everyone, regardless of experience level.

**Beginner Instruction**: New to Go? No problem! We have dedicated teachers who love introducing newcomers to the game. We provide teaching sets and patient instruction to help you get started.

**Tournament Play**: For those seeking competitive play, we organize monthly tournaments and participate in regional events throughout the Pacific Northwest.

**Study Groups**: Advanced players can join our joseki study sessions and game review meetings where we analyze professional games and discuss advanced strategies.

## Community Impact

We believe Go is more than just a game—it's a tool for building critical thinking skills, patience, and strategic planning. We've partnered with local schools to introduce Go as an educational tool and regularly host demonstration events at the Eugene Saturday Market.

## Join Us!

Whether you're a complete beginner or a seasoned player new to the area, we welcome you to join our community. Check out our meeting schedule and come by for a friendly game. We promise you'll leave with new friends and a deeper appreciation for this incredible game.

Ready to start your Go journey? We'll see you at the board!`,
    author: "Michael Chen",
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Community",
    tags: ["welcome", "community", "beginners"],
    featured: true
  },
  {
    id: "go-basics-rules-strategy",
    title: "Go Basics: Understanding Rules and Basic Strategy",
    excerpt: "A comprehensive guide to Go rules and fundamental strategies for beginners looking to improve their game.",
    content: `Learning Go can seem daunting at first, but once you understand the basic rules and concepts, you'll discover why millions of people around the world are passionate about this game.

## The Basic Rules

Go is played on a grid of lines (usually 19x19 for full games, though 13x13 and 9x9 are common for beginners). The rules are surprisingly simple:

### 1. Alternating Play
Black goes first, then players alternate placing stones on the intersections of the lines (not in the squares).

### 2. Capture
Stones or groups of stones are captured when they have no liberties (empty adjacent points). Captured stones are removed from the board.

### 3. Ko Rule
You cannot immediately recapture a single stone that just captured one of your stones, preventing infinite loops.

### 4. Scoring
At the end of the game, players count their territory (empty points surrounded by their stones) plus captured stones. The player with more points wins.

## Fundamental Strategies

### Corner, Side, Center Priority
In the opening, corners are most valuable because they're easier to secure with fewer stones. Sides come next, and the center is typically contested later in the game.

### Connect and Cut
Keep your stones connected when possible, and look for opportunities to cut your opponent's stones apart. Connected stones are stronger and harder to capture.

### Life and Death
Learn to recognize when groups of stones are "alive" (cannot be captured) or "dead" (will inevitably be captured). This is crucial for good play.

### Influence vs. Territory
Some moves directly secure territory, while others build influence for future fighting. Balancing these concepts is key to strong play.

## Practice Tips

1. **Start with smaller boards**: Learn on 9x9 or 13x13 boards before moving to the full 19x19 game.

2. **Solve life and death problems**: These puzzles will dramatically improve your tactical skills.

3. **Review your games**: Look at your completed games to understand where you made good and bad moves.

4. **Play regularly**: Like any skill, Go improves with consistent practice.

## Next Steps

Once you're comfortable with the basic rules, consider joining our beginner study group where we explore these concepts in more depth. We also recommend online resources like OGS (Online-Go.com) for practice games between our meetings.

Remember, Go is a lifelong journey. Even professional players continue learning new concepts throughout their careers. Enjoy the process!`,
    author: "Sarah Williams",
    date: "2024-01-22",
    readTime: "8 min read",
    category: "Education",
    tags: ["basics", "strategy", "beginners", "rules"]
  },
  {
    id: "joseki-fundamentals",
    title: "Joseki Fundamentals: Corner Patterns Every Player Should Know",
    excerpt: "Explore the essential corner patterns (joseki) that form the foundation of good opening play in Go.",
    content: `Joseki—standardized corner sequences—are the foundation of strong opening play in Go. While memorizing joseki isn't everything, understanding the principles behind these patterns will dramatically improve your game.

## What is Joseki?

Joseki are sequences of moves in the corners that are considered locally optimal for both players. They've been refined over centuries of play and represent the collective wisdom of countless Go players.

## Why Study Joseki?

### Efficiency in the Opening
Joseki help you develop efficiently in the opening without falling behind. If you play random moves while your opponent plays joseki, you'll likely find yourself at a disadvantage.

### Understanding Patterns
Studying joseki teaches you important shape concepts that apply throughout the game, not just in corners.

### Building Confidence
Knowing joseki gives you confident moves to play, especially important for beginners who might otherwise feel lost in the opening.

## Essential Joseki to Learn First

### 1. The 3-3 Invasion
When your opponent has a stone on the 4-4 point, the 3-3 invasion is a fundamental technique. This sequence guarantees the invader some territory while the defender gains outside influence.

**Key Lesson**: Territory vs. influence trade-offs are central to Go strategy.

### 2. Small Knight's Approach
Approaching an opponent's corner stone with a small knight's move leads to various joseki depending on the defender's response. This is probably the most common approach move in professional play.

**Key Lesson**: Flexibility and reading ahead are crucial—the same approach can lead to very different results.

### 3. Attachment and Extension
When facing a corner approach, one option is to attach (play right next to the approaching stone) and then extend. This creates a solid but low position.

**Key Lesson**: Contact moves often lead to settling quickly but may not be the most ambitious choice.

## Studying Joseki Effectively

### Don't Just Memorize
Instead of rote memorization, try to understand:
- Why each move is played
- What happens if you deviate
- How the resulting position fits into the whole board

### Learn the Principles
Focus on the underlying principles:
- Corners before sides before center
- Settle quickly when invaded
- Build influence when you can't make territory

### Practice Variations
Don't just learn the main line—understand what happens when moves are played in different orders or when deviations occur.

## Common Joseki Mistakes

### Over-reliance on Memory
Playing joseki moves without understanding the position often leads to inferior results when the position doesn't match your memorized patterns exactly.

### Ignoring the Whole Board
Joseki are "locally optimal" but the best move always depends on the whole board position. Sometimes deviating from joseki is correct.

### Learning Too Many at Once
It's better to deeply understand a few basic joseki than to shallowly memorize many complex ones.

## Moving Beyond Basic Joseki

As you improve, you'll learn that:
- Direction of play matters more than exact moves
- Fighting spirit sometimes trumps "correct" joseki
- Innovation and adaptation are as important as tradition

## Recommended Study Method

1. Start with 3-4 basic joseki
2. Play them out on a board repeatedly
3. Try variations and see what goes wrong
4. Apply them in actual games
5. Review and analyze the results

Remember, joseki study should enhance your understanding, not replace your ability to read and think. Use them as a foundation, but always consider the unique aspects of each position.

Happy studying, and see you at the board!`,
    author: "David Kim",
    date: "2024-02-05",
    readTime: "12 min read",
    category: "Education",
    tags: ["joseki", "opening", "strategy", "patterns"]
  },
  {
    id: "tournament-recap-winter-2024",
    title: "Winter Tournament 2024 Recap",
    excerpt: "Highlights from our recent winter tournament, including exciting games, surprising upsets, and community achievements.",
    content: `Our Winter 2024 tournament was our biggest yet, with 28 players competing across four divisions. Here's a recap of the exciting weekend of Go!

## Tournament Highlights

### A Division (Dan Players)
The A Division saw intense competition among our strongest players. Local 3-dan Jessica Park took first place after a thrilling final game against visiting 2-dan Robert Chen from Portland. The game featured a brilliant tesuji in the endgame that decided the outcome.

**Final Standings:**
1. Jessica Park (3d) - 5-0
2. Robert Chen (2d) - 4-1  
3. Mark Thompson (1d) - 3-2

### B Division (SDK Players)
The single-digit kyu division was incredibly competitive, with several players achieving personal bests. Sarah Mitchell's improvement over the past year was evident as she secured second place, just one point behind winner Tom Rodriguez.

**Final Standings:**
1. Tom Rodriguez (3k) - 4-1
2. Sarah Mitchell (5k) - 4-1
3. Alex Chen (2k) - 3-2

### C Division (DDK Players)
Our double-digit kyu division showed tremendous fighting spirit. First-time tournament participant Emma Johnson impressed everyone with her steady play, finishing third in her debut tournament.

**Final Standings:**
1. Kevin Wu (12k) - 5-0
2. Lisa Anderson (15k) - 4-1
3. Emma Johnson (18k) - 3-2

### D Division (Beginners)
The beginner division featured several club members playing in their first tournament. The enthusiasm and sportsmanship displayed by these new players was inspirational.

**Final Standings:**
1. Michael Foster - 4-1
2. Jennifer Lee - 3-2
3. Carlos Martinez - 3-2

## Special Achievements

### Most Improved Player
The "Most Improved Player" award went to Sarah Mitchell, who has climbed from 12k to 5k over the past year through dedicated study and regular play.

### Best Fighting Spirit
Emma Johnson received the "Fighting Spirit" award for her never-give-up attitude and creative play in challenging positions.

### Upset of the Tournament
In the biggest upset, 15k Lisa Anderson defeated 8k player Steve Wilson in a beautifully played game that showcased her improved endgame skills.

## Game Analysis Corner

### Tesuji of the Tournament
Jessica Park's winning move in the final deserves special recognition. In what appeared to be a losing position, she found a brilliant sacrifice that turned the game around:

*[We analyzed this position in detail during our post-tournament review session]*

The key was recognizing that sacrificing three stones would create enough aji (potential) to launch a winning attack on the opponent's large group.

## Community Moments

### Teaching and Learning
Between rounds, stronger players offered teaching games to beginners. These informal lessons are what make our club special—the willingness of experienced players to help newcomers improve.

### Social Connections
Tournament breaks featured lively discussions about games, strategy, and life beyond Go. Several new friendships were formed over shared lunches and coffee.

### International Flavor
We were honored to host visiting players from Portland, Seattle, and even a tourist from Japan who happened to be in town during the tournament.

## Looking Ahead

### Spring Tournament
Mark your calendars! Our Spring Tournament is scheduled for April 13-14. We're planning to expand to include a team tournament format alongside individual play.

### Study Groups
The tournament highlighted areas where our club can focus upcoming study sessions:
- Endgame techniques (many games were decided by small margins)
- Opening principles (several games featured unusual fuseki)
- Life and death (some groups lived that should have died!)

### Visiting Professionals
We're excited to announce that professional player Yuki Tanaka 7p will visit our club in March for a simultaneous exhibition and teaching session.

## Thank You

Special thanks to:
- Tournament Director Mike Chen for flawless organization
- All volunteers who helped with pairings, timekeeping, and setup
- Local businesses who sponsored prizes
- Every participant who made this tournament memorable

Whether you won every game or lost every game, your participation made our community stronger. In Go, as in life, every game is a chance to learn and grow.

Can't wait to see everyone at the next tournament!`,
    author: "Tournament Committee",
    date: "2024-02-18",
    readTime: "10 min read",
    category: "Events",
    tags: ["tournament", "recap", "community", "results"]
  },
  {
    id: "go-and-ai-alphago-impact",
    title: "Go and AI: How AlphaGo Changed Our Ancient Game",
    excerpt: "Exploring the profound impact of AI on Go strategy, teaching methods, and the global Go community since AlphaGo's historic victory.",
    content: `When AlphaGo defeated world champion Lee Sedol in 2016, it didn't just mark a milestone in artificial intelligence—it fundamentally changed how we understand and play Go.

## The Historic Moment

March 2016 will forever be remembered in Go history. AlphaGo's 4-1 victory over Lee Sedol shocked the Go world and sparked a renaissance in the game that continues today.

### What Made It Special?
- Go was considered the last major board game where humans dominated
- The victory came much sooner than experts predicted
- AlphaGo displayed genuinely creative and surprising moves

## Revolutionary Moves

### Move 37 in Game 2
AlphaGo's shoulder hit on the fifth line in Game 2 was so unusual that commentators initially thought it was a mistake. This move, later recognized as brilliant, exemplified AI's ability to find moves that humans would never consider.

### The Impact on Professional Play
Professional players worldwide began studying AlphaGo's games, leading to:
- Reevaluation of "fundamental" Go knowledge
- New opening patterns and strategies
- A more experimental approach to positional play

## How AI Changed Go Strategy

### Opening Revolution
Traditional opening theory was turned upside down:
- **3-3 invasions** became much more common at the professional level
- **Early shoulder hits** and unusual approaches gained acceptance
- **Influence-oriented play** was reevaluated

### Fighting and Reading
AI revealed that human intuition about:
- Life and death was often incomplete
- Fighting sequences had more possibilities than imagined
- Endgame values were frequently miscalculated

### Whole-Board Thinking
Perhaps most importantly, AI demonstrated superior:
- Global position evaluation
- Balance between territory and influence
- Timing of strategic decisions

## Impact on Teaching and Learning

### New Study Methods
The Go community adapted by:
- Incorporating AI analysis into game reviews
- Using AI to generate practice problems
- Studying AI vs. AI games for pure strategy

### Changing Pedagogical Approaches
Teachers began emphasizing:
- Flexibility over rigid rules
- Experimental thinking over traditional patterns
- Global judgment over local calculations

### The Democratization of Strong Play
AI tools made expert-level analysis available to:
- Club players studying their games
- Remote students without access to strong teachers
- Anyone curious about deep Go strategy

## The Human Response

### Initial Shock and Adaptation
The Go community's response evolved through several phases:
1. **Disbelief**: "This can't be right"
2. **Resistance**: "AI doesn't understand Go's spirit"
3. **Curiosity**: "What can we learn from this?"
4. **Integration**: "How do we use this tool effectively?"

### Professional Player Evolution
Today's professional players:
- Study with AI engines regularly
- Show more experimental playing styles
- Display increased tactical accuracy
- Maintain uniquely human creativity and style

## Beyond Strategy: Cultural Impact

### Global Go Renaissance
AlphaGo's victory sparked:
- Increased media attention to Go
- New players discovering the game
- Greater investment in Go education and promotion
- Cross-cultural dialogue about AI and human intelligence

### Philosophical Questions
The AI revolution in Go raised profound questions:
- What makes human play valuable when machines are stronger?
- How do we maintain Go's artistic and cultural elements?
- What role should AI play in Go education?

## The Current Landscape

### AI as a Tool, Not a Replacement
Today's consensus recognizes AI as:
- An invaluable training partner
- A source of new ideas and analysis
- A complement to, not replacement for, human creativity
- A bridge connecting players of different strengths

### Continued Human Fascination
Despite AI's strength, humans remain drawn to Go because:
- The beauty of the game transcends pure strength
- Human creativity and style remain unique
- The social and cultural aspects are irreplaceable
- The learning journey is as valuable as the destination

## Lessons for Our Club

### Embracing New Tools
We've integrated AI analysis into our:
- Game review sessions
- Tournament preparation
- Teaching curricula
- Study group discussions

### Maintaining Human Values
While learning from AI, we emphasize:
- The joy of creative play
- The importance of human interaction
- The value of the learning process
- The cultural richness of Go tradition

## Looking Forward

The AI revolution in Go continues to unfold. As new engines emerge and our understanding deepens, we can expect:
- Further refinement of Go theory
- New teaching and learning methodologies
- Continued growth in the global Go community
- Deeper integration of human creativity with AI analysis

## Conclusion

AlphaGo didn't diminish Go—it revealed new depths we never knew existed. At the Eugene Go Club, we celebrate both the ancient wisdom of our game and the new insights that AI has brought to light.

Whether you're a traditionalist who loves old joseki or an experimenter inspired by AI innovations, there's never been a more exciting time to play Go.

Come join us at the board, where 4,000 years of human wisdom meets cutting-edge artificial intelligence!`,
    author: "Dr. Jennifer Walsh",
    date: "2024-03-01",
    readTime: "15 min read",
    category: "Analysis",
    tags: ["AI", "AlphaGo", "strategy", "history", "professional"]
  }
];

export const blogCategories = [
  "All",
  "Community", 
  "Education",
  "Events",
  "Analysis",
  "Strategy"
];