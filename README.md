# fridge assistant: What's in your fridge?

#### A Next.js web app that uses the OpenAI API with structured responses to identify food items in your fridge and provide detailed nutritional information about each ingredient.

## Visit the production deployment at [fridge-assistant-sigma.vercel.app](https://fridge-assistant-sigma.vercel.app/)

### Table of Contents

- [fridge assistant: What's in your fridge?](#fridge-assistant-whats-in-your-fridge)
  - [Description](#description)
  - [Features](#features)
- [Architecture](#architecture)
  - [Tech Stack](#tech-stack)
  - [Architecture Overview](#architecture-overview)
- [React Components](#react-components)
  - [`<ImageUpload />`](#imageupload-)
    - [Props](#props)
    - [State](#state)
    - [Refs](#refs)
    - [Methods](#methods)
    - [Workflow](#workflow)
    - [UI Elements](#ui-elements)
    - [Example Usage](#example-usage)
  - [`<FoodGrid />`](#foodgrid-)
    - [Props](#props-1)
    - [Interface](#interface)
    - [Example Usage](#example-usage-1)
  - [`<FoodItemCard>`](#fooditemcard)
    - [Props](#props-2)
    - [Interface](#interface-1)
    - [Example Usage](#example-usage-2)
- [API](#api)
  - [POST /imageDescription](#post-imagedescription)
    - [Imports](#imports)
    - [Endpoint](#endpoint)
    - [About generateObject](#about-generateobject)
  - [Output](#output)
  - [Error Handling and Validation](#error-handling-and-validation)
- [Lessons Learn and Some Limitations](#lessons-learn-and-some-limitations)

### Description

**fridge assistant** helps users identify food items in their fridge and provides information about each item in a friendly easy to read grid. It is both mobile friendly and easy to use on larger screen sizes.

## Features

1. Upload any image with food items and receive a list of the items from the image.

<img src="./app/assets/initial-ui-state.png" alt="fridge assistant upload screenshot mobile" width="500">

2. After selecting an image, the ui will display a loading state or `processing`.

<img src="./app/assets/loading-ui-state.png" alt="fridge assistant upload screenshot mobile" width="500">

3. The results are displayed in a grid of food item cards that are responsive to a users screen size making to easy to use on any size device screen.

<img src="./app/assets/results-ui-state.png" alt="fridge assistant screenshot desktop" width="500">

4. Each food item is displayed in an easy to read card with helpful information about each item including, name, description, quantity, flavors and nutritional information.

<img src="./app/assets/card-ui-state.png" alt="fridge assistant screenshot desktop" width="250">

##

# Architecture

## Tech Stack

- [Next.js](https://nextjs.org/)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Vercel-ai-sdk](https://sdk.vercel.ai/)
- [Open-ai-provider](https://sdk.vercel.ai/providers/ai-sdk-providers/openai)
- [Vercel](https://vercel.com/products/rendering)

## Architecture Overview

<img src="./app/assets/architecture-diagram.png" alt="fridge assistant screenshot desktop" width="500">

# React Components

### `<ImageUpload />`

The ImageUpload component allows users to upload an image of their fridge's contents. It processes the image and sends it to the backend for analysis. The identified ingredients are then set in the parent component's state.

### Props

- `setIngredients`: A state setter function to update the list of ingredients identified from the uploaded image.

### State

- `file`: Stores the uploaded file.
- `error`: Stores any error messages encountered during the upload process.
- `isLoading`: Indicates whether the image is being processed.

### Refs

- `formRef`: A reference to the form element. Used during the submit phase
- `fileInputRef`: A reference to the file input element.

### Methods

- `handleImageChange(e: ChangeEvent<HTMLInputElement>)`: Handles the change event for the file input, setting the selected file in the state.
- `handleSubmit(e: React.FormEvent<HTMLFormElement>)`: Handles the form submission, reads the file as a base64 string, validates it, and sends it to the backend API for processing.

### Workflow

1. **Image Selection:** Users select an image using the file input.
2. **Image Processing:** The selected image is read as a base64 string and validated.
3. **API Call:** The base64 string is sent to the /api/imageDescription endpoint.
4. **Response Handling:** The response from the API is used to update the list of ingredients or display an error message.

### UI Elements

- A form with a file input for image upload.
- A button to trigger the file input and display a loading spinner during processing.
- Error messages displayed below the button.

### Example Usage

```
<ImageUpload setIngredients={setIngredients} />
```

#

### `<FoodGrid />`

The FoodGrid component is responsible for displaying a grid of food items. Each item is represented by a FoodItemCard component. This component dynamically adjusts the number of columns based on the screen size.

### Props

- `ingredients`: An array of `Ingredient` objects to be displayed in the grid.

### Interface

```
interface FoodGridProps {
  ingredients: Ingredient[];
}
```

### Example Usage

```
 <FoodGrid ingredients={ingredients} />
```

#

### `<FoodItemCard>`

The FoodItemCard component is responsible for displaying detailed information about a single food item. It is used within the FoodGrid component to render each ingredient in a card format.

### Props

- `ingredient`: An object of type Ingredient that contains information about the food item.

### Interface

See the api section for details on the schema

```
interface FoodItemCardProps {
  ingredient: Ingredient;
}
```

### Example Usage

```
<FoodItemCard ingredient={ingredient} />
```

#

## API

### POST /imageDescription

`route.ts File`

This file defines the API endpoint for processing image descriptions. It uses OpenAI's GPT-4o model to analyze an uploaded image and return a structured response.

### Imports

- `generateObject` from `ai`: Function to generate an object using the OpenAI model.
- `openAI` from `@/app/providers/openAI`: Function to initialize the OpenAI model.
- `outputSchema` from @/app/schemas/schemas: Schema for validating the output.
- `prompt` from @/app/constants/constants: Prompt text for the OpenAI model.

### Endpoint

- `POST /imageDescription`: This is a `Nextjs` App Router endpoint.
- `Input`: request object with a Base64 image file string and a image mime-type which are passed to the openAI `generateObject` function.

## About generateObject

In order to get a consistent response from the LLM, we need to ask it to provide a response in a structured format. That's where the `generateObject` function can help our app.

The `generateObject` function takes the following arguments:

- model: the openai model we want to use
- output: <object> - return an object as output
- schema: a schema validated with the `zod` dependency
- maxTokens: this endpoint uses a large number of tokens in order to process the image description result. We are currently capping the number of tokens in order to avoid overuse during the development phase.
- messages: an array of message objects. In this case, we want our application endpoint to send the image and a text prompt with instructions to the model.

### Output

A successful result from the `generateObject` function will return a response which we can cast to JSON and return to our `<ImageUpload />` component.

### Error Handling and Validation

The app validates the image file and protects the endpoint in a try/catch. In the event of API failure on the part of OpenAI, or if we somehow pass in incorrect arguments. The route will catch the error and report back to the caller.

The `<ImageUpload />` component is designed to handle errors gracefully and will display error messages in red font color directly underneath the `Upload` button.

## Lessons Learn and Some Limitations

I acknowledge that there are potentially more suitable models for this application. During initial testing, Anthropic's `claude-3.5-sonnet` demonstrated more consistent results. However, I opted to use OpenAI's `gpt-4o` to streamline the development process, given its comprehensive documentation and ability to provide consistent structured responses. As a next step, if I were to continue development I would consider other models and perhaps do some A/B testing to determine which model is best.

In a real-world scenario, several optimizations could be implemented. Benchmark testing of various models would help identify the most appropriate model for this specific use case. Additionally, delegating the task of reporting concrete data, such as nutritional information, to a custom dataset could be beneficial. This approach could reduce token usage and improve the task's latency over time.
In terms of the user interface, I would also love to add some icons or images to each food item card but again, we would need to utilize some datasets in order to match up results to the correct icons or images.
