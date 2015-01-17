module Jekyll
  class RenderTimeTag < Liquid::Tag

    def initialize(tag_name, url, tokens)
      super
      @url = url
      @class_name = "navbutton"
    end

    def render(context)
      page_url = context.environments.first["page"]["url"]
      if @url == page_url
        @class_name += " is-active"
      end
      @class_name
    end
  end
end

Liquid::Template.register_tag('render_time', Jekyll::RenderTimeTag)