defmodule UiTestingWeb.HomeLive do
  use UiTestingWeb, :live_view


  def render(assigns) do
    ~H"""
    <div>
       <section class="bg-[#F5F2ED] h-screen flex flex-col items-center ">
        <header class="bg-white h-16 w-full"></header>
          <h1 class="uppercase font-bold text-4xl mt-60 mb-10">OSHIN PLAYGROUND</h1>
          <p>Welcome to my UI playground. A place where I can feel free to test and learn UI by myself.</p>
       </section>
       <section class="bg-blue-500 h-screen">
          <h1>Welcome to my UI </h1>
       </section>
    </div>
    """
  end
end
