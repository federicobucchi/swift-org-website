---
layout: new-layouts/storybook
title: Welcome to Swift.org Storybook
atom: true
---

# Swift.org Storybook

## Classes
* [Grid](#grid)

## Components

* [Banner](#banner)
* [Box](#box)
* [Code](#code)
* [Heading](#heading)
* [Link](#link)
* [Section](#section)

<br />

---

## Classes

<br />

### Grid

<br />

#### Code example

<br />

{% raw %}
    <div class="grid-1-col">
        <div>content</div>
    </div>

    <div class="grid-2-cols">
        <div>content</div>
        <div>content</div>
    </div>
{% endraw %}

<br />

#### attributes

<br />

#### Render

<br />

<div class="grid-1-col">
    <div>content</div>
</div>

<div class="grid-2-cols">
    <div>content</div>
    <div>content</div>
</div>

<br />

---

## Components

<br />

### Banner

<br />

#### Code example

<br />

{% raw %}
{%

        include new-includes/components/banner.html

        text="hello world"

        style="purple"

%}
{% endraw %}

<br />

#### attributes

<br />

{% raw %}

* text = text inside the banner

* style = type of banner
    * values: "purple"

{% endraw %}

<br />

#### Render

<br />

{%
    include new-includes/components/banner.html
    text="hello world"
    style="purple"
%}

<br />

---

<br />

### Box

<br />

#### Code example

<br />

{% raw %}
{%

        include new-includes/components/box.html

        type="code"

        language="swift"

        content="var number = 2"

%}
{% endraw %}

<br />

#### attributes

<br />

{% raw %}

* content = content of the box

--

* css (optional) = custom css

* image (optional) = name of image to use
    * values: "globe"

* language (optional) = language of code

* link (optional) = page to navigate

* style (optional) = predifined style to use
    * values: "orange", "white"

* target (optional) = where link should open

* type (optional) = type of box
    * values: "code"

{% endraw %}

<br />

#### Render

<br />

{% include new-includes/components/box.html
    type="code"
    language="swift"
    content="var number = 2"
%}

<br />

---

<br />

### Code

<br />

#### Code example

<br />

{% raw %}
{%

        include new-includes/components/code.html

        language="swift"

        code="var number = 2"

%}
{% endraw %}

<br />

#### attributes

<br />

{% raw %}

* language = code language

* code = code to show

{% endraw %}

<br />

#### Render

<br />

{% include new-includes/components/code.html
    language="swift"
    code="var number = 2"
%}

<br />

---

<br />

### Heading

<br />

#### Code example

<br />

{% raw %}
{%

        include new-includes/components/heading.html

        title="Heading title"

        text="Heading description"

%}
{% endraw %}

<br />

#### attributes

<br />

{% raw %}

* title = title to show

--

* for (optional) = inside which component
    * values: "box"
* text (optional) = text to show

{% endraw %}

<br />

#### Render

<br />

{%
    include new-includes/components/heading.html
    title="Heading title"
    text="Heading description"
%}

<br />
---

<br />

### Link

<br />

#### Code example

<br />

{% raw %}
{%

        include new-includes/components/link.html

        type="button"

        style="orange"

        text="Click Me"

%}
{% endraw %}

<br />

#### attributes

<br />

{% raw %}

* text = link's text
* url = link's url

--

* type (optional) = type of link
    * values: "button"
* style (optional) = style of link
    * values: "orange", "black"
* target (optional) = where url should open
* css (optional) = custom css

{% endraw %}

<br />

#### Render

<br />

{% include new-includes/components/link.html
    type="button"
    style="orange"
    url="#"
    text="Click Me"
%}

<br />

---

<br />

### Section

<br />

#### Code example

<br />

{% raw %}

    {% capture test-section %}

        <div class="grid-2-cols">

            <div>

                Right Content

            </div>

            <div>

                Left Content

            </div>

        </div>

    {% endcapture %}

    {%
        include new-includes/components/section.html

        style="orange"

        content=test-section
    %}

{% endraw %}

<br />

#### attributes

<br />

{% raw %}

* content = content's section

--

* style (optional) = style of section
    * values: "orange", "purple", "yellow"

{% endraw %}

<br />

#### Render

<br />

{% capture test-section %}
<div class="grid-2-cols">
    <div>
        Right Content
    </div>
    <div>
        Left Content
    </div>
</div>
{% endcapture %}
{%
    include new-includes/components/section.html
    style="orange"
    content=test-section
%}

<br />