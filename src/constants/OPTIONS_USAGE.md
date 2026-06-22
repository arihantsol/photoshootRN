# Photoshoot Options Usage Guide

## Overview

The photoshoot options are centralized in `/src/constants/photoshootOptions.ts` and can be used throughout the mobile app with fallback support for when API data is unavailable.

## File Structure

### 1. Constants File (`photoshootOptions.ts`)
Contains all available options organized by category:
- Product types (fashion, jewelry, electronics, etc.)
- Photoshoot styles (modern, classic, luxury, etc.)
- Output types, aspect ratios, watermarks
- Model options (type, origin, body type, pose, expression)
- Advanced options (lighting, camera, composition, etc.)

### 2. Utility Functions (`optionsHelper.ts`)
Helper functions to process and retrieve options:
- `processPhotoshootOptions()` - Merges API options with fallback constants
- `getFieldOptions()` - Get options for a specific field
- `getOptionLabel()` - Get label for an option value

## Usage Examples

### Basic Usage with API Options

```typescript
import { processPhotoshootOptions } from '../utils/optionsHelper';
import PHOTOSHOOT_OPTIONS from '../constants/photoshootOptions';

// In your component
const processed = processPhotoshootOptions(photoshootOptions);

// Use in FormSelect
<FormSelect
  label="Product Type"
  value={value}
  onValueChange={onChange}
  options={processed.productType}
/>
```

### Using Fallback Constants

```typescript
// When API data is not available, use constants directly
<FormSelect
  label="Product Type"
  value={value}
  onValueChange={onChange}
  options={PHOTOSHOOT_OPTIONS.productType}
/>
```

### Getting Single Field Options

```typescript
import { getFieldOptions } from '../utils/optionsHelper';

const productTypes = getFieldOptions('productType', photoshootOptions);
// Returns: [{ label: 'Fashion', value: 'fashion', help: '...' }, ...]
```

### Getting Option Label

```typescript
import { getOptionLabel } from '../utils/optionsHelper';

const label = getOptionLabel('productType', 'fashion', photoshootOptions);
// Returns: 'Fashion'
```

## Available Option Keys

### Basic Options
- `productType` - Type of product
- `photoshootStyle` - Visual style of photoshoot
- `outputType` - How product is displayed (on-human, mannequin, standalone, lifestyle)
- `aspectRatio` - Image ratio (1:1, 16:9, 9:16, 4:3, 3:2, 2:3)
- `watermarkType` - Watermark style
- `aiProvider` - AI service provider

### Model Options
- `modelType` - Gender/type (unisex, male, female, child, plus-size)
- `modelOrigin` - Ethnicity
- `modelBodyType` - Body build
- `modelPose` - Standing/sitting/walking etc.
- `modelExpression` - Facial expression

### Product Options
- `productCount` - Number of products shown
- `productAngle` - Product viewing angle

### Composition Options
- `compositionType` - Layout (side-by-side, stacked, grid, collage, carousel)

### Advanced Options

**Environment & Background:**
- `backgroundType` - White, transparent, color, gradient, blurred, studio
- `environmentStyle` - Studio, outdoor, urban, natural, luxury, minimalist

**Color & Mood:**
- `colorScheme` - Warm, cool, neutral, vibrant, pastel, monochrome
- `moodTone` - Energetic, calm, professional, luxury, playful, romantic

**Lighting:**
- `lightingType` - Natural, studio, golden-hour, harsh, soft, dramatic
- `lightDirection` - Front, back, side, top, bottom, all-around

**Camera & Composition:**
- `shotComposition` - Close-up, wide, medium, full-body, detail-focus
- `cameraAngle` - Straight-on, high-angle, low-angle, dutch-angle, overhead
- `depthOfField` - Shallow, medium, deep

**Context & Timing:**
- `season` - Spring, summer, fall, winter
- `occasion` - Everyday, party, business, wedding, vacation, holiday
- `timeOfDay` - Morning, afternoon, evening, night, sunrise, sunset

**Demographics:**
- `targetAudience` - Young adults, adults, professionals, parents, seniors, all-ages
- `marketSegment` - Budget, mid-range, premium, luxury, niche

**Props & Styling:**
- `propDensity` - Minimal, light, moderate, heavy
- `textureEmphasis` - Smooth, rough, soft, glossy, matte
- `materialFocus` - Fabric, metal, wood, plastic, glass, leather

**Brand Context:**
- `industryType` - Fashion, technology, retail, luxury, food-beverage, beauty, home-garden
- `brandPersonality` - Professional, playful, elegant, bold, friendly, minimalist, artistic

## How It Works

1. **API Options Priority**: When API returns photoshoot options, they are used with all fields properly formatted
2. **Fallback to Constants**: If API is unavailable or missing specific fields, the hardcoded constants are used
3. **Consistent Interface**: All options use the same structure: `{ label, value, help }`

## Migration Notes

- All existing selector components have been updated to accept dynamic options
- The `photoshootOptions` prop from the store is passed to selectors
- Each selector processes options through the helper functions
- Fallback ensures app works even if API is unreachable

## Adding New Options

To add new options:

1. Add to the `PHOTOSHOOT_OPTIONS` object in `photoshootOptions.ts`
2. Create corresponding selector component or use `FormSelect`
3. Use the options in your form controller

Example:
```typescript
// In photoshootOptions.ts
newOptionType: [
  { label: 'Option 1', value: 'option-1', help: 'Description' },
  { label: 'Option 2', value: 'option-2', help: 'Description' },
]

// In component
import { getFieldOptions } from '../utils/optionsHelper';

const options = getFieldOptions('newOptionType', photoshootOptions);
```
