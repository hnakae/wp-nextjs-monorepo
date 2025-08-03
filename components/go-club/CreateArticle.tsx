import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { SGFUploader } from './SGFUploader';
import { SGFData, ParsedSGF } from '@/lib/sgf-types';
import { SGFViewer } from './SGFViewer';
import { SGFCommentaryEditor } from '@/components/go-club/SGFCommentaryEditor';
import { ArrowLeft, Plus, X, Save, Eye } from 'lucide-react';
import { blogCategories } from '../../data/blog-articles';

interface CreateArticleProps {
  onNavigate: (page: 'home' | 'blog' | 'create-article') => void;
}

interface ArticleForm {
  title: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  sgfData: SGFData | null;
}

export function CreateArticle({ onNavigate }: CreateArticleProps) {
  const [form, setForm] = useState<ArticleForm>({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    tags: [],
    sgfData: null
  });
  
  const [tagInput, setTagInput] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  const [selectedSGF, setSelectedSGF] = useState<SGFData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('upload');

  const handleInputChange = (field: keyof ArticleForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    if (tagInput.trim() && !form.tags.includes(tagInput.trim())) {
      setForm(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setForm(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  // Reset tab when SGF is removed
  const removeSGF = () => {
    setSelectedSGF(null);
    setForm(prev => ({ ...prev, sgfData: null }));
    setActiveTab('upload');
  };

  const handleSGFSelect = (parsedSGF: ParsedSGF | null) => {
    if (parsedSGF) {
      const transformedSGFData: SGFData = {
        title: parsedSGF.gameInfo.event || 'Untitled SGF',
        description: '', // Can be filled later or derived
        initialCommentary: '', // Can be filled later or derived
        boardSize: parsedSGF.size,
        gameInfo: parsedSGF.gameInfo,
        moves: parsedSGF.moves.map(move => ({
          stone: { x: move.x, y: move.y, color: move.color },
          title: '', // Can be derived from move.comment or other info
          commentary: move.comment || '',
        })),
        totalMoves: parsedSGF.totalMoves,
      };
      setSelectedSGF(transformedSGFData);
      setForm(prev => ({ ...prev, sgfData: transformedSGFData }));
    } else {
      setSelectedSGF(null);
      setForm(prev => ({ ...prev, sgfData: null }));
    }
    // Automatically switch to edit commentary tab
    setActiveTab('edit');
  };

  const handleSubmit = async () => {
    if (!form.title || !form.content) {
      alert('Please fill in at least the title and content');
      return;
    }

    setIsSubmitting(true);
    try {
      // Here you would integrate with your backend API
      console.log('Submitting article:', form);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Article submitted successfully! It will be reviewed before publication.');
      onNavigate('blog');
    } catch (error) {
      console.error('Error submitting article:', error);
      alert('Error submitting article. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderPreview = () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{form.category || 'Uncategorized'}</Badge>
          {form.tags.map(tag => (
            <Badge key={tag} variant="outline">{tag}</Badge>
          ))}
        </div>
        
        <h1 className="text-4xl font-bold">{form.title || 'Untitled Article'}</h1>
        
        {form.excerpt && (
          <p className="text-lg text-muted-foreground italic">{form.excerpt}</p>
        )}
      </div>

      <div className="prose prose-lg max-w-none">
        {form.content.split('\n\n').map((paragraph, index) => {
          if (paragraph.startsWith('## ')) {
            return <h2 key={index} className="text-2xl font-semibold mt-8 mb-4">{paragraph.replace('## ', '')}</h2>;
          } else if (paragraph.startsWith('### ')) {
            return <h3 key={index} className="text-xl font-semibold mt-6 mb-3">{paragraph.replace('### ', '')}</h3>;
          } else if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
            return <p key={index} className="font-semibold mb-4">{paragraph.replace(/\*\*/g, '')}</p>;
          } else {
            return <p key={index} className="mb-4 leading-relaxed">{paragraph}</p>;
          }
        })}
      </div>

      {selectedSGF && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Interactive Go Game</h3>
          <SGFViewer 
            title={selectedSGF.title}
            description={selectedSGF.description}
            moves={selectedSGF.moves}
            boardSize={selectedSGF.boardSize}
            initialCommentary={selectedSGF.initialCommentary}
          />
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={() => onNavigate('blog')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Button>
              <div>
                <h1 className="text-3xl font-bold">Create New Article</h1>
                <p className="text-muted-foreground">Share your Go knowledge with the community</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setIsPreview(!isPreview)}
                className="flex items-center gap-2"
              >
                <Eye className="h-4 w-4" />
                {isPreview ? 'Edit' : 'Preview'}
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                {isSubmitting ? 'Submitting...' : 'Submit Article'}
              </Button>
            </div>
          </div>

          {isPreview ? (
            <Card>
              <CardHeader>
                <CardTitle>Article Preview</CardTitle>
                <CardDescription>This is how your article will appear to readers</CardDescription>
              </CardHeader>
              <CardContent>
                {renderPreview()}
              </CardContent>
            </Card>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Form */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Article Content</CardTitle>
                    <CardDescription>Write your article content and metadata</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Title */}
                    <div className="space-y-2">
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        placeholder="Enter article title..."
                        value={form.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                      />
                    </div>

                    {/* Excerpt */}
                    <div className="space-y-2">
                      <Label htmlFor="excerpt">Excerpt</Label>
                      <Textarea
                        id="excerpt"
                        placeholder="Brief description of your article (optional)..."
                        value={form.excerpt}
                        onChange={(e) => handleInputChange('excerpt', e.target.value)}
                        rows={3}
                      />
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <Label htmlFor="content">Content *</Label>
                      <Textarea
                        id="content"
                        placeholder="Write your article content here... 

You can use markdown-style formatting:
## For headings
### For subheadings  
**For bold text**

Write naturally about Go concepts, strategies, or experiences!"
                        value={form.content}
                        onChange={(e) => handleInputChange('content', e.target.value)}
                        rows={15}
                        className="font-mono text-sm"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* SGF Integration */}
                <Card>
                  <CardHeader>
                    <CardTitle>Game Record Integration</CardTitle>
                    <CardDescription>Add an interactive Go game to your article (optional)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="upload">Upload SGF</TabsTrigger>
                        <TabsTrigger value="edit" disabled={!selectedSGF}>Edit Commentary</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="upload" className="space-y-4">
                        <div className="space-y-4">
                          <SGFUploader 
                            onSGFSelect={handleSGFSelect}
                            selectedFile={selectedSGF?.title || ''}
                          />
                          {selectedSGF && (
                            <div className="p-4 bg-muted/50 rounded-lg">
                              <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                  <p className="font-medium">Selected: {selectedSGF.title}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {selectedSGF.moves.length} moves • Click &quot;Edit Commentary&quot; to add analysis
                                  </p>
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={removeSGF}
                                >
                                  Remove
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="edit">
                        {selectedSGF ? (
                          <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                              <div className="space-y-1">
                                <p className="font-medium">Editing: {selectedSGF.title}</p>
                                <p className="text-sm text-muted-foreground">
                                  Navigate through moves and add commentary to create an educational game analysis
                                </p>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setActiveTab('upload')}
                              >
                                Change SGF
                              </Button>
                            </div>
                            <SGFCommentaryEditor
                              title={selectedSGF.title}
                              description={selectedSGF.description}
                              moves={selectedSGF.moves}
                              boardSize={selectedSGF.boardSize}
                              initialCommentary={selectedSGF.initialCommentary}
                              onUpdateSGF={(updatedSGF) => {
                                setSelectedSGF(updatedSGF);
                                setForm(prev => ({ ...prev, sgfData: updatedSGF }));
                              }}
                            />
                          </div>
                        ) : (
                          <div className="text-center py-12">
                            <p className="text-muted-foreground mb-4">
                              No game record uploaded yet. Upload an SGF file first to edit commentary.
                            </p>
                            <Button onClick={() => setActiveTab('upload')}>
                              Upload SGF File
                            </Button>
                          </div>
                        )}
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Article Settings</CardTitle>
                    <CardDescription>Categorize and tag your article</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Category */}
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select value={form.category} onValueChange={(value: string) => handleInputChange('category', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category..." />
                        </SelectTrigger>
                        <SelectContent>
                          {blogCategories.filter(cat => cat !== 'All').map(category => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Tags */}
                    <div className="space-y-2">
                      <Label>Tags</Label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add tag..."
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && addTag()}
                        />
                        <Button 
                          type="button" 
                          size="sm" 
                          onClick={addTag}
                          className="shrink-0"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      {form.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {form.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                              {tag}
                              <X 
                                className="h-3 w-3 cursor-pointer"
                                onClick={() => removeTag(tag)}
                              />
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Guidelines */}
                <Card>
                  <CardHeader>
                    <CardTitle>Writing Guidelines</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-muted-foreground">
                    <p>• Write clearly and engagingly about Go topics</p>
                    <p>• Include practical examples when possible</p>
                    <p>• Use SGF files to illustrate key positions</p>
                    <p>• Upload an SGF file to automatically enter commentary editing mode</p>
                    <p>• Keep beginners in mind when explaining concepts</p>
                    <p>• Proofread before submitting</p>
                    <p>• Articles will be reviewed before publication</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
